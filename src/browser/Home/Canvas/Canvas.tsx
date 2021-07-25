import React, { ReactElement } from 'react';
import {
  Scene, PerspectiveCamera, WebGLRenderer, Vector3, CatmullRomCurve3,
  PlaneGeometry, WireframeGeometry, LineSegments, Mesh, Color, Group,
  ShaderMaterial, MeshBasicMaterial, DoubleSide, FontLoader, Font,
  ShapeBufferGeometry,
} from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { WalkMode } from '../duck/types';
import FONT from './fonts/helvetiker_regular';
import * as S from './styles';

const PLANE_SIZE = 500;
const CELL_SIZE  = 3;
const NUM_CELLS = PLANE_SIZE / CELL_SIZE;

function clamp(x: number, min: number, max: number): number {
  return x < min ? min : (x > max ? max : x);
}

function lerp(x: number, min: number, max: number): number {
  return min + x * (max - min);
}

interface CanvasProps {
  scroll: number;
  walkMode: WalkMode;
  onNavigateNext: () => void;
}

interface CanvasState {
  stopPoint: number;
}

/**
 * The component that renders WebGL canvas on the Home screen.
 */
export default class Canvas extends React.Component<CanvasProps, CanvasState> {
  private viewPointOffset = 0.1;
  private walkDuration = 10; // in seconds
  private walkOffset = -0.5; // to adjust start position, in seconds
  private stopPoints = [0.11, 0.325, 0.605, 0.815];
  private walkPath = new CatmullRomCurve3([
    new Vector3(-50, 5, -50),
    new Vector3(-50, 5, 50),
    new Vector3(50, 5, 50),
    new Vector3(50, 5, -50),
  ], true);
  private textBoards = [
    { text: 'Hi there!', position: 0.18, size: 10 },
    { text: '     My name is\nAlexander Korostin', position: 0.4, size: 5 },
    { text: '  I\'m a fullstack\nweb programmer', position: 0.7, size: 5 },
    { text: 'Scroll down to see\n  my latest works', position: 0.9, size: 5 },
  ];
  private canvasRef = React.createRef<HTMLCanvasElement>();
  private scene = new Scene();
  private renderer: WebGLRenderer;
  private camera: PerspectiveCamera;
  private startTime: number;
  private font: Font;
  private animationFrameId: number = null;

  public state: CanvasState = {
    stopPoint: 0,
  };

  public render(): ReactElement {
    return (
      <S.Canvas ref={this.canvasRef}>
        Upgrade your browser to see the WebGL animation
      </S.Canvas>
    );
  }

  // public shouldComponentUpdate(): boolean {
  //   return false;
  // }

  public componentDidMount(): void {
    this.initializeRenderer();
    this.setUpScene();
    if (this.props.walkMode === 'play') {
      this.animationFrameId = requestAnimationFrame(this.renderFrame);
    }
    window.addEventListener('resize', this.onWindowResize);
  }

  public componentWillUnmount(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', this.onWindowResize);
  }

  public componentDidUpdate(): void {
    if (this.props.walkMode === 'scroll') {
      this.renderSceneAtScrollPosition();

      if (this.props.scroll > 0.99) {
        this.props.onNavigateNext();
      }
    }
  }

  private initializeRenderer() {
    const canvas = this.canvasRef.current;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    this.renderer = new WebGLRenderer({ alpha: true, canvas });
    this.renderer.setClearColor(0, 0);
  }

  private setUpScene(): void {
    const { width, height } = this.renderer.getContext().canvas;
    this.camera = new PerspectiveCamera(75, width / height, 0.1, 120);
    this.scene.add(this.camera);

    this.addTerrain();

    const fontLoader = new FontLoader();
    this.font = fontLoader.parse(FONT);
    for (const board of this.textBoards) {
      this.addTextBillboard(board.text, board.position, board.size);
    }
  }

  private onWindowResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const canvas = this.canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    if (this.props.walkMode === 'scroll') {
      this.renderSceneAtScrollPosition();
    }
  };

  /**
   * Adds the terrain on the scene.
   */
  private addTerrain(): void {
    const geometry = new PlaneGeometry(PLANE_SIZE, PLANE_SIZE, NUM_CELLS, NUM_CELLS);
    const position = geometry.getAttribute('position');
    for (let i = 0; i < position.count; i++) {
      position.setZ(i, Math.random());
    }
    const wireframe = new WireframeGeometry(geometry);
    wireframe.rotateX(- Math.PI / 2);
    const material = new ShaderMaterial({
      vertexShader: `
        varying float transparency;

        float fade(float dist, float minDist, float maxDist) {
          if (dist <= minDist) return 1.0;
          if (dist >= maxDist) return 0.0;
          float x = (dist - minDist) / (maxDist - minDist);
          return 1.0 - x * x;
        }

        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          transparency = fade(gl_Position.z, 30.0, 50.0);
        }
      `,
      fragmentShader: `
        varying float transparency;
        void main() {
          gl_FragColor = vec4(1.0, 1.0, 1.0, transparency);
        }
      `,
      wireframe: true,
    });
    material.transparent = true;
    this.scene.add(new LineSegments(wireframe, material));
  }

  /**
   * Adds the text billboard on the scene.
   *
   * @param text Text to render.
   * @param time Position on a curve from 0 to 1.
   * @param size Glyph size in world coordinates.
   */
  private addTextBillboard(text: string, time: number, size = 10): void {
    const point = this.walkPath.getPointAt(time);
    const tangent = this.walkPath.getTangent(time).normalize();
    const originalDirection = new Vector3(0, 0, -1);
    const color = new Color(0xffffff);

    const matLite = new MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.2,
      side: DoubleSide,
    })
    const shapes = this.font.generateShapes(text, size);
    const textGeometry = new ShapeBufferGeometry(shapes);
    textGeometry.computeBoundingBox();
    const xMid = 0.5 * (textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x);
    const textYOffset = -textGeometry.boundingBox.min.y - 3;
    textGeometry.translate(-xMid, textYOffset, 0);
    const mesh = new Mesh(textGeometry, matLite);
    mesh.quaternion.setFromUnitVectors(originalDirection, tangent);
    mesh.position.copy(point);
    this.scene.add(mesh);

    const holeShapes = [];
    for ( let i = 0; i < shapes.length; i ++ ) {
      const shape = shapes[ i ];
      if ( shape.holes && shape.holes.length > 0 ) {
        for ( let j = 0; j < shape.holes.length; j ++ ) {
          const hole = shape.holes[ j ];
          holeShapes.push( hole );
        }
      }
    }
    shapes.push.apply(shapes, holeShapes);

    const matDark = new MeshBasicMaterial({
      color,
      side: DoubleSide,
    });
    const style = SVGLoader.getStrokeStyle(size / 20, color.getStyle());
    const strokeText = new Group();
    for (const shape of shapes) {
      const points = shape.getPoints().map(v => new Vector3(v.x, v.y, 0));
      const geometry = SVGLoader.pointsToStroke(points, style);
      geometry.translate(-xMid, 0, 0);
      const strokeMesh = new Mesh(geometry, matDark);
      strokeText.add(strokeMesh);
    }
    strokeText.quaternion.setFromUnitVectors(originalDirection, tangent);
    strokeText.position.copy(point.add(tangent.multiplyScalar(-0.8)));
    strokeText.position.y += textYOffset;
    this.scene.add(strokeText);
  }

  /**
   * Renders a frame for a given time.
   */
  private renderFrame = (time: number): void => {
    if (!this.startTime) {
      this.startTime = time;
    }
    const elapsed = (time - this.startTime) / 1000;

    const t = ((this.walkOffset + elapsed) % this.walkDuration) / this.walkDuration;
    this.renderSceneAtPoint(t < 0 ? t + 1 : t);

    this.animationFrameId = requestAnimationFrame(this.renderFrame);
  };

  private renderSceneAtScrollPosition(): void {
    // Clamp overscroll
    const scroll = clamp(this.props.scroll, 0, 1);
    // Map [0, 1] -> [startPosition, endPosition] and render
    const from = this.stopPoints[0];
    const to = this.stopPoints[this.stopPoints.length - 1];
    this.renderSceneAtPoint(lerp(scroll, from, to));
  }

  /**
   * Renders the scene with the camera located at a position t on the walk curve.
   *
   * @param t Position on the walk curve from 0 to 1.
   */
  private renderSceneAtPoint(t: number) {
    const eyePoint = this.walkPath.getPointAt(t);
    this.camera.position.copy(eyePoint);
    this.camera.lookAt(this.walkPath.getPointAt((t + this.viewPointOffset) % 1));

    this.renderer.render(this.scene, this.camera);
  }
}
