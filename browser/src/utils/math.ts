export const MINUTE = 1000 * 60;
export const HOUR = MINUTE * 60;
export const DAY = HOUR * 24;
export const MONTH = DAY * 30;
export const YEAR = DAY * 365;

/**
 * Returns smallest number not less or greater than a scalar.
 *
 * @param x Scalar to clamp.
 * @param min Scalar for bottom of clamp range.
 * @param max Scalar for top of clamp range.
 */
export function clamp(x: number, min: number, max: number): number {
  return x < min ? min : (x > max ? max : x);
}

/**
 * Returns linear interpolation of two scalars based on a weight.
 *
 * @param a Scalar to weight; returned when w is zero.
 * @param b Scalar to weight; returned when w is one.
 * @param w Scalar weight.
 */
export function lerp(a: number, b: number, w: number): number {
  return a + w * (b - a);
}

/**
 * Returns number of years that have passed from a specified date till now.
 *
 * @param date The date to count years from.
 * @returns Number of years elapsed.
 */
export function yearsFrom(dateLike: Date | string): number {
  const date = dateLike instanceof Date ? dateLike : new Date(dateLike);
  return Math.floor((Date.now() - date.getTime()) / YEAR);
}
