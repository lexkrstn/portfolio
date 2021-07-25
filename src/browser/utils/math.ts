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
