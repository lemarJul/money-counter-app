import type { ICurrencyMetadata, IDenomination } from "./Money.types";

export const EUR: ICurrencyMetadata = {
  code: "EUR",
  symbol: "€",
  name: "Euro",
  subunit: "Cent",
  base: 100,
} as const;

export const EUR_DENOMINATION_VALUES = {
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

export const EUR_ROLLS_CAPACITY = {
  CENT_1: 50,
  CENT_2: 50,
  CENT_5: 50,
  CENT_10: 40,
  CENT_20: 40,
  CENT_50: 40,
  EURO_1: 25,
  EURO_2: 25,
} as const;

export const EUR_COINS_WEIGHT = {
  CENT_1: 2.3,
  CENT_2: 3.06,
  CENT_5: 3.92,
  CENT_10: 4.1,
  CENT_20: 5.74,
  CENT_50: 7.88,
  EURO_1: 7.5,
  EURO_2: 8.5,
} as const;

/**
 * List of all Euro denominations with their properties
 */
export const EUR_DENOMINATIONS: readonly IDenomination[] = [
  {
    id: "CENT_1",
    value: EUR_DENOMINATION_VALUES.CENT_1,
    rollCapacity: EUR_ROLLS_CAPACITY.CENT_1,
    unitWeight: EUR_COINS_WEIGHT.CENT_1,
    isSubunit: true,
  },
  {
    id: "CENT_2",
    value: EUR_DENOMINATION_VALUES.CENT_2,
    rollCapacity: EUR_ROLLS_CAPACITY.CENT_2,
    unitWeight: EUR_COINS_WEIGHT.CENT_2,
    isSubunit: true,
  },
  {
    id: "CENT_5",
    value: EUR_DENOMINATION_VALUES.CENT_5,
    rollCapacity: EUR_ROLLS_CAPACITY.CENT_5,
    unitWeight: EUR_COINS_WEIGHT.CENT_5,
    isSubunit: true,
  },
  {
    id: "CENT_10",
    value: EUR_DENOMINATION_VALUES.CENT_10,
    rollCapacity: EUR_ROLLS_CAPACITY.CENT_10,
    unitWeight: EUR_COINS_WEIGHT.CENT_10,
    isSubunit: true,
  },
  {
    id: "CENT_20",
    value: EUR_DENOMINATION_VALUES.CENT_20,
    rollCapacity: EUR_ROLLS_CAPACITY.CENT_20,
    unitWeight: EUR_COINS_WEIGHT.CENT_20,
    isSubunit: true,
  },
  {
    id: "CENT_50",
    value: EUR_DENOMINATION_VALUES.CENT_50,
    rollCapacity: EUR_ROLLS_CAPACITY.CENT_50,
    unitWeight: EUR_COINS_WEIGHT.CENT_50,
    isSubunit: true,
  },
  {
    id: "EURO_1",
    value: EUR_DENOMINATION_VALUES.EURO_1,
    rollCapacity: EUR_ROLLS_CAPACITY.EURO_1,
    unitWeight: EUR_COINS_WEIGHT.EURO_1,
    isSubunit: false,
  },
  {
    id: "EURO_2",
    value: EUR_DENOMINATION_VALUES.EURO_2,
    rollCapacity: EUR_ROLLS_CAPACITY.EURO_2,
    unitWeight: EUR_COINS_WEIGHT.EURO_2,
    isSubunit: false,
  },
  { id: "EURO_5", value: EUR_DENOMINATION_VALUES.EURO_5, isSubunit: false },
  { id: "EURO_10", value: EUR_DENOMINATION_VALUES.EURO_10, isSubunit: false },
  { id: "EURO_20", value: EUR_DENOMINATION_VALUES.EURO_20, isSubunit: false },
  { id: "EURO_50", value: EUR_DENOMINATION_VALUES.EURO_50, isSubunit: false },
  { id: "EURO_100", value: EUR_DENOMINATION_VALUES.EURO_100, isSubunit: false },
  { id: "EURO_200", value: EUR_DENOMINATION_VALUES.EURO_200, isSubunit: false },
  { id: "EURO_500", value: EUR_DENOMINATION_VALUES.EURO_500, isSubunit: false },
] as const;
