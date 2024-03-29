import React, { ReactElement } from 'react';
import {
  CatmullRomCurve3, Color, DoubleSide, Font, FontLoader, Group, LineSegments,
  Mesh, MeshBasicMaterial, PerspectiveCamera, PlaneGeometry, Scene,
  ShaderMaterial, ShapeBufferGeometry, Vector3, WebGLRenderer, WireframeGeometry,
} from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { clamp, lerp } from '../../utils';
import { WalkMode } from '../../pages/Home/duck';
import FONT from './fonts/helvetiker_regular.json';
import * as S from './styles';

const PLANE_SIZE = 500;
const CELL_SIZE = 3;
const NUM_CELLS = PLANE_SIZE / CELL_SIZE;

type ScrollListener = (scrollRatio: number, scrollerElement: HTMLElement) => void;

interface CanvasProps {
  /**
   * User interaction and animation mode. Cannot be updated dynamically.
   */
  walkMode: WalkMode;
  /**
   * The callback that is called when the user scrolls to the end.
   */
  onReachedEnd: () => void;
  /**
   * The callback that must register a given scroll listener.
   */
  addScrollListener: (listener: ScrollListener) => void;
  /**
   * The callback paired to addScrollListener(), which does the opposite thing.
   */
  removeScrollListener: (listener: ScrollListener) => void;
}

interface CanvasState {
  /**
   * Window scroll position in the [0..1]
   */
  scrollRatio: number;
  /**
   * A read only reference to the scroll listener that is bound to a Canvas
   * instance. The reference is put here to be able to reach it from the static
   * getDerivedStateFromProps().
   * Despite some degree of akwardness this approch is required here for
   * rendering optimization.
   */
  scrollListener: ScrollListener;
  /**
   * The instance of the listener remover that is paired with the listener
   * adder that was used in previous getDerivedStateFromProps() call.
   */
  removeScrollListener?: (listener: ScrollListener) => void;
}

/**
 * The component that renders WebGL canvas on the Home screen.
 */
export default class Canvas extends React.Component<CanvasProps, CanvasState> {
  private viewPointOffset = 0.1;
  private walkDuration = 10; // in seconds
  private walkOffset = -0.5; // to adjust start position, in seconds
  private stopPoints = [0.11, 0.325, 0.605, 0.815];
  private canvasRef = React.createRef<HTMLCanvasElement>();
  private scene = new Scene();
  private renderer: WebGLRenderer;
  private camera: PerspectiveCamera;
  private startTime: number;
  private font: Font;
  private animationFrameId: number = null;

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

  public state: CanvasState = {
    scrollRatio: 0,
    scrollListener: (scrollRatio: number) => {
      this.setState({ scrollRatio });
    },
  };

  public static getDerivedStateFromProps(
    { addScrollListener, removeScrollListener }: CanvasProps,
    prevState: CanvasState,
  ): Partial<CanvasState> | null {
    if (prevState.removeScrollListener !== removeScrollListener) {
      // Remove the scroll listener from the previous event dispatcher
      if (prevState.removeScrollListener) {
        prevState.removeScrollListener(prevState.scrollListener);
      }
      // Add the scroll listener to the current event dispatcher
      addScrollListener(prevState.scrollListener);
      // Update the dispatcher's function in the state
      return { removeScrollListener };
    }
    return null;
  }

  public componentDidMount(): void {
    this.initializeRenderer();
    this.setUpScene();
    const { walkMode } = this.props;
    if (walkMode === 'play') {
      this.animationFrameId = requestAnimationFrame(this.renderFrame);
    }
    window.addEventListener('resize', this.onWindowResize);
  }

  public componentDidUpdate(): void {
    const { walkMode, onReachedEnd } = this.props;
    const { scrollRatio } = this.state;
    if (walkMode === 'scroll') {
      this.renderSceneAtScrollPosition();

      if (scrollRatio > 0.99) {
        onReachedEnd();
      }
    }
  }

  public componentWillUnmount(): void {
    const { removeScrollListener, scrollListener } = this.state;
    if (removeScrollListener) {
      removeScrollListener(scrollListener);
    }
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', this.onWindowResize);
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
    const { walkMode } = this.props;
    if (walkMode === 'scroll') {
      this.renderSceneAtScrollPosition();
    }
  };

  private initializeRenderer() {
    const canvas = this.canvasRef.current;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    this.renderer = new WebGLRenderer({ alpha: true, canvas });
    this.renderer.setClearColor(0, 0);
  }

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
    wireframe.rotateX(-Math.PI / 2);
    const material = new ShaderMaterial({
      fragmentShader: `
        varying float transparency;
        void main() {
          gl_FragColor = vec4(1.0, 1.0, 1.0, transparency);
        }
      `,
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
      opacity: 0.2,
      side: DoubleSide,
      transparent: true,
    });
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
    for (const shape of shapes) {
      if (shape.holes) {
        for (const hole of shape.holes) {
          holeShapes.push(hole);
        }
      }
    }
    shapes.push(...holeShapes as any[]);

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
    const { scrollRatio } = this.state;
    // Map [0, 1] -> [startPosition, endPosition] and render
    const from = this.stopPoints[0];
    const to = this.stopPoints[this.stopPoints.length - 1];
    this.renderSceneAtPoint(lerp(from, to, clamp(scrollRatio, 0, 1)));
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

  public render(): ReactElement {
    return (
      <S.Canvas ref={this.canvasRef}>
        Upgrade your browser to see the WebGL animation
      </S.Canvas>
    );
  }
}
