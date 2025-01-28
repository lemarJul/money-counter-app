/**
 * This module defines constants and types related to Euro currency denominations.
 * It provides data for various Euro coins and bills, including their values,
 * roll capacities (for coins), and unit weights (for coins).  This data can be
 * used for currency calculations and till count management.
 */
export const DENOMINATION_VALUES = {
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

export const ROLLS_CAPACITY = {
  CENT_1: 50,
  CENT_2: 50,
  CENT_5: 50,
  CENT_10: 40,
  CENT_20: 40,
  CENT_50: 40,
  EURO_1: 25,
  EURO_2: 25,
} as const;

export const COINS_WEIGHT = {
  CENT_1: 2.3,
  CENT_2: 3.06,
  CENT_5: 3.92,
  CENT_10: 4.1,
  CENT_20: 5.74,
  CENT_50: 7.88,
  EURO_1: 7.5,
  EURO_2: 8.5,
} as const;

export type DenominationNameType = keyof typeof DENOMINATION_VALUES;
export type DenominationValueType =
  (typeof DENOMINATION_VALUES)[keyof typeof DENOMINATION_VALUES];
export type RollCapacityType =
  (typeof ROLLS_CAPACITY)[keyof typeof ROLLS_CAPACITY];
export type CoinWeightType = (typeof COINS_WEIGHT)[keyof typeof COINS_WEIGHT];

/**
 * Defines the structure for data representing Euro currency denominations.  Includes
 * properties for the denomination's ID, value, roll capacity (optional, for coins),
 * and unit weight (optional, for coins).
 */
export type MoneyDataType = {
  readonly id: DenominationNameType;
  readonly value: DenominationValueType;
  readonly rollCapacity?: RollCapacityType;
  readonly unitWeight?: CoinWeightType;
};

/**
 * This constant array `EuroData` provides a comprehensive list of Euro currency denominations,
 * structured as an array of `MoneyDataType` objects.  Each object represents a specific
 * denomination (coin or bill), containing its ID, value, and optionally, roll capacity
 * and unit weight (for coins).  This data is ideal for applications requiring detailed
 * information about Euro currency, such as currency converters, till count management systems,
 * or financial calculators.
 */
export const EuroData: MoneyDataType[] = [
  {
    id: "CENT_1",
    value: DENOMINATION_VALUES.CENT_1,
    rollCapacity: ROLLS_CAPACITY.CENT_1,
    unitWeight: COINS_WEIGHT.CENT_1,
  },
  {
    id: "CENT_2",
    value: DENOMINATION_VALUES.CENT_2,
    rollCapacity: ROLLS_CAPACITY.CENT_2,
    unitWeight: COINS_WEIGHT.CENT_2,
  },
  {
    id: "CENT_5",
    value: DENOMINATION_VALUES.CENT_5,
    rollCapacity: ROLLS_CAPACITY.CENT_5,
    unitWeight: COINS_WEIGHT.CENT_5,
  },
  {
    id: "CENT_10",
    value: DENOMINATION_VALUES.CENT_10,
    rollCapacity: ROLLS_CAPACITY.CENT_10,
    unitWeight: COINS_WEIGHT.CENT_10,
  },
  {
    id: "CENT_20",
    value: DENOMINATION_VALUES.CENT_20,
    rollCapacity: ROLLS_CAPACITY.CENT_20,
    unitWeight: COINS_WEIGHT.CENT_20,
  },
  {
    id: "CENT_50",
    value: DENOMINATION_VALUES.CENT_50,
    rollCapacity: ROLLS_CAPACITY.CENT_50,
    unitWeight: COINS_WEIGHT.CENT_50,
  },
  {
    id: "EURO_1",
    value: DENOMINATION_VALUES.EURO_1,
    rollCapacity: ROLLS_CAPACITY.EURO_1,
    unitWeight: COINS_WEIGHT.EURO_1,
  },
  {
    id: "EURO_2",
    value: DENOMINATION_VALUES.EURO_2,
    rollCapacity: ROLLS_CAPACITY.EURO_2,
    unitWeight: COINS_WEIGHT.EURO_2,
  },
  { id: "EURO_5", value: DENOMINATION_VALUES.EURO_5 },
  { id: "EURO_10", value: DENOMINATION_VALUES.EURO_10 },
  { id: "EURO_20", value: DENOMINATION_VALUES.EURO_20 },
  { id: "EURO_50", value: DENOMINATION_VALUES.EURO_50 },
  { id: "EURO_100", value: DENOMINATION_VALUES.EURO_100 },
  { id: "EURO_200", value: DENOMINATION_VALUES.EURO_200 },
  { id: "EURO_500", value: DENOMINATION_VALUES.EURO_500 },
] as const;
