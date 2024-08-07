import { PerUnitCounter, PerWeightCounter, PerRollCounter } from "./MoneyCounters";
import { MoneyDenominationType } from './MoneyDenominations';

type CountersType = {
  unit: PerUnitCounter;
  weight?: PerWeightCounter;
  roll?: PerRollCounter;
};

/**
 * Represents a denomination inventory.
 */
export class DenominationInventory {
  public readonly denomination: MoneyDenominationType;
  public counters: {
    unit: PerUnitCounter;
    weight?: PerWeightCounter;
    roll?: PerRollCounter;
  };

  constructor({
    denomination,
    counters,
  }: {
    denomination: MoneyDenominationType;
    counters?: CountersType | undefined;
  }) {
    this.denomination = denomination;
    this.counters = {
      unit: new PerUnitCounter(counters?.unit.count),
      weight: denomination.unitWeight
        ? new PerWeightCounter(denomination.unitWeight, counters?.weight?.count)
        : undefined,
      roll: denomination.rollCapacity
        ? new PerRollCounter(denomination.rollCapacity, counters?.roll?.count)
        : undefined,
    };
  }

  public get label(): string {
    const euroVal = centToEuro(this.denomination.value)
    return `${euroVal >= 1 ? euroVal : euroVal.toFixed(2)}€`
  }


  public get totalUnits(): number {
    return Object.values(this.counters)
      .map((counter) => counter?.totalUnits ?? 0)
      .reduce((sum, totalUnits) => sum + totalUnits, 0);
  }
  public get totalValue(): number {
    return centToEuro(this.totalUnits * this.denomination.value);
  }
}

function centToEuro(value: number): number {
  return +(value / 100);
}
