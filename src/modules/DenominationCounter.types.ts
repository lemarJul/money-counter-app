import { MoneyDataType } from "../data/Euro";
import { Counter } from "./Counter";

export interface DenominationCountInterface {
  denomination: MoneyDataType;
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
  denomination: MoneyDataType;
  countersInit?: InitialCountsType;
};
