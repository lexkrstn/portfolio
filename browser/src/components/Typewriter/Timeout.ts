export type TimeoutListener = () => void;

export default class Timeout {
  private timeoutId: NodeJS.Timeout;
  private timeoutListener: TimeoutListener;

  public constructor(private delay: number) {
  }

  public setTimeoutListener(listener: TimeoutListener) {
    this.timeoutListener = listener;
  }

  public reset() {
    this.stop();
    this.start();
  }

  public start() {
    if (this.timeoutId) return;
    this.timeoutId = setTimeout(() => {
      this.timeoutId = null;
      if (this.timeoutListener) {
        this.timeoutListener();
      }
    }, this.delay);
  }

  public stop() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  public destroy() {
    this.stop();
  }
}
