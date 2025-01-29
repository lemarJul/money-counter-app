import type { IDenomination } from "./Money.types";
import {
  EUR_DENOMINATION_VALUES,
  EUR_ROLLS_CAPACITY,
  EUR_COINS_WEIGHT,
} from "./Euro";

export type EuroDenominationId = keyof typeof EUR_DENOMINATION_VALUES;
export type EuroValue =
  (typeof EUR_DENOMINATION_VALUES)[keyof typeof EUR_DENOMINATION_VALUES];
export type EuroRollQuantity =
  (typeof EUR_ROLLS_CAPACITY)[keyof typeof EUR_ROLLS_CAPACITY];
export type EuroCoinWeight =
  (typeof EUR_COINS_WEIGHT)[keyof typeof EUR_COINS_WEIGHT];

export interface IEuroDenomination extends IDenomination {
  readonly id: EuroDenominationId;
  readonly value: EuroValue;
  readonly rollCapacity?: EuroRollQuantity;
  readonly unitWeight?: EuroCoinWeight;
}
