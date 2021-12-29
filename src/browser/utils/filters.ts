const YEAR = new Date().getFullYear();

/**
 * Returns a human-readable representation of the number of years that have
 * passed from the specified one to the present.
 */
export function yearsFrom(year: number): string {
  const elapsed = YEAR - year;
  if (elapsed === 0) return '<1 year';
  if (elapsed === 1) return '1 year';
  return `${elapsed} years`;
}
