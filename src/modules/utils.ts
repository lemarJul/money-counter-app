/**
 * Converts a value from cents to euros
 * @param cents - The value in cents to convert
 * @returns The value in euros
 */
export function centToEuro(cents: number): number {
  return +(cents / 100);
}
