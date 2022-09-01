import TextwriterKeyframe from './TypewriterKeyframe';

/**
 * Base KeyframeAnimator action.
 */
interface AnimatorAction {
  type: 'print' | 'delete';
  delay: number;
  keyframe: TextwriterKeyframe;
}

/**
 * KeyframeAnimator order to print a character.
 */
interface PrintAnimatorAction extends AnimatorAction {
  type: 'print';
  letter: string;
}

/**
 * KeyframeAnimator order to delete a character.
 */
interface DeleteAnimatorAction extends AnimatorAction {
  type: 'delete';
}

/**
 * One of concrete AnimatorActions.
 */
type AnyAnimatorAction = PrintAnimatorAction | DeleteAnimatorAction;

/**
 * The handler that is invoked when some animation action
 * needs to be executed (e.g. printing or removing a letter).
 */
type ActionHandler = (action: AnyAnimatorAction) => void;

/**
 * Runs keyframe animation.
 */
export default class KeyframeAnimator {
  private actions: AnyAnimatorAction[];
  private actionIndex = 0;
  private timeoutId: NodeJS.Timeout;
  private actionHandler: ActionHandler;

  /**
   * Creates an animator object.
   *
   * @param keyframes Keyframe array.
   * @param delay Default delay before keyframes.
   * @param printDuration Default delay before printing another character.
   * @param deleteDuration Default delay before deleting another character.
   */
  public constructor(
    keyframes: TextwriterKeyframe[],
    private delay: number,
    private printDuration: number,
    private deleteDuration: number,
  ) {
    this.actions = this.decompose(keyframes);
  }

  /**
   * Sets the handler that is invoked when some animation action
   * needs to be executed (e.g. printing or removing a letter).
   */
  public setActionHandler(actionHandler: ActionHandler) {
    this.actionHandler = actionHandler;
  }

  /**
   * Starts animation.
   */
  public start() {
    this.stop();
    this.chargeAction();
  }

  /**
   * Stops animation.
   */
  public stop() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  /**
   * Disposes the object to prevent memory leaks.
   */
  public destroy() {
    this.stop();
  }

  /**
   * Decomposes keyframes to more simple AnimatorActions.
   */
  private decompose(keyframes: TextwriterKeyframe[]): AnyAnimatorAction[] {
    const actions: AnyAnimatorAction[] = [];
    let numChars = 0;
    for (const keyframe of keyframes) {
      if (keyframe.clear) {
        const count = typeof keyframe.clear === 'number' ? keyframe.clear : numChars;
        for (let i = 0; i < count; i++) {
          actions.push({
            type: 'delete',
            delay: i === 0 ? keyframe.delay || this.delay : this.deleteDuration,
            keyframe,
          });
        }
      }
      if (keyframe.text) {
        const newActions = keyframe.text.split('')
          .map((ch, i): PrintAnimatorAction => ({
            type: 'print',
            delay: i === 0 ? keyframe.delay || this.delay : this.printDuration,
            letter: ch,
            keyframe,
          }));
        numChars += newActions.length;
        actions.push(...newActions);
      }
    }
    return actions;
  }

  /**
   * Schedules next action executions.
   */
  private chargeAction() {
    const action = this.actions[this.actionIndex];
    this.timeoutId = setTimeout(() => {
      this.timeoutId = null;
      this.actionHandler(action);
      this.actionIndex = (this.actionIndex + 1) % this.actions.length;
      this.chargeAction();
    }, action.delay);
  }
}
