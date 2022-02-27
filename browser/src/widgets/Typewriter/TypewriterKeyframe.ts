export default interface TypewriterKeyframe {
  /**
   * The text to print.
   */
  text?: string;
  /**
   * Delay before printing the portion of the text.
   */
  delay?: number;
  /**
   * Milliseonds required to print 1 symbol.
   */
  printDuration?: number;
  /**
   * Size of this portion text.
   */
  fontSize?: string;
  /**
   * Delete the symbols has already been printed.
   */
  clear?: boolean | number;
  /**
   * Milliseonds required to delete 1 symbol.
   */
  clearDuration?: number;
}
