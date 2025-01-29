import type { IDenomination } from "../data/Money.types";
import { Counter } from "./Counter";

export interface DenominationCountInterface {
  denomination: IDenomination;
  counterSet: counterSetType;
  label: string;
  totalUnits: number;
  totalValue: number;
  updateCounter(
    counterKey: keyof DenominationCountInterface["counterSet"],
    newValue: number
  ): DenominationCountInterface;
}

export type counterSetType = {
  unit: Counter;
  weight?: Counter;
  roll?: Counter;
};

export type InitialCountsType = {
  unit?: number;
  weight?: number;
  roll?: number;
};

export type ConstructorParams = {
  denomination: IDenomination;
  countersInit?: InitialCountsType;
};
