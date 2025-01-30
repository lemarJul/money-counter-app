import type { IDenomination, ICurrencyMetadata } from "../data/Money.types";
import { Counter } from "./Counter";

export interface IDenominationCounter {
  denomination: IDenomination;
  currencyMetaData: ICurrencyMetadata;
  counterSet: counterSetType;
  formattedValue: string;
  totalUnits: number;
  totalValue: number;
  updateCounter(
    counterKey: keyof IDenominationCounter["counterSet"],
    newValue: number
  ): IDenominationCounter;
}

export type counterSetType = {
  unit: Counter;
  weight?: Counter;
  roll?: Counter;
};

export type CountsStateType = {
  unit?: number;
  weight?: number;
  roll?: number;
};
