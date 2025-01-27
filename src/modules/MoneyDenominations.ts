/**
 * Constants for Euro denominations in cents
 */
export const EURO = {
  /** Coins */
  CENT_1: 1,
  CENT_2: 2,
  CENT_5: 5,
  CENT_10: 10,
  CENT_20: 20,
  CENT_50: 50,
  EURO_1: 100,
  EURO_2: 200,
  /** Bills */
  EURO_5: 500,
  EURO_10: 1000,
  EURO_20: 2000,
  EURO_50: 5000,
  EURO_100: 10000,
  EURO_200: 20000,
  EURO_500: 50000,
} as const;

/**
 * Type definition for a money denomination
 * @property value - The value in cents (e.g., 100 = 1€)
 * @property rollCapacity - Optional. The number of units that fit in a roll (for coins)
 * @property unitWeight - Optional. The weight of a single unit in grams (for coins)
 */
export type MoneyDenominationType = {
  readonly value: number;
  readonly rollCapacity?: number;
  readonly unitWeight?: number;
};

/**
 * List of all available money denominations
 * - Coins (1¢ to 2€): Include roll capacity and unit weight for counting methods
 * - Bills (5€ to 500€): Only include value as they are counted individually
 */
export const MoneyDenominations: MoneyDenominationType[] = [
  { value: EURO.CENT_1, rollCapacity: 50, unitWeight: 2.3 },
  { value: EURO.CENT_2, rollCapacity: 50, unitWeight: 3.06 },
  { value: EURO.CENT_5, rollCapacity: 50, unitWeight: 3.92 },
  { value: EURO.CENT_10, rollCapacity: 40, unitWeight: 4.1 },
  { value: EURO.CENT_20, rollCapacity: 40, unitWeight: 5.74 },
  { value: EURO.CENT_50, rollCapacity: 40, unitWeight: 7.8 },
  { value: EURO.EURO_1, rollCapacity: 25, unitWeight: 7.5 },
  { value: EURO.EURO_2, rollCapacity: 25, unitWeight: 8.5 },
  { value: EURO.EURO_5 },
  { value: EURO.EURO_10 },
  { value: EURO.EURO_20 },
  { value: EURO.EURO_50 },
  { value: EURO.EURO_100 },
  { value: EURO.EURO_200 },
  { value: EURO.EURO_500 },
];
