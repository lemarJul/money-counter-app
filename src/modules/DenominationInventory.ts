import { PerUnitCounter, PerWeightCounter, PerRollCounter } from "./MoneyCounters";
import { MoneyDenominationType } from './MoneyDenominations';
import { centToEuro } from './utils';

/**
 * Type definition for the different types of counters available for a denomination
 */
type CountersType = {
  unit: PerUnitCounter;
  weight: PerWeightCounter | undefined;
  roll: PerRollCounter | undefined;
};

/**
 * Represents an inventory for a specific money denomination.
 * Handles different counting methods: per unit, per weight, and per roll.
 */
export class DenominationInventory {
  public readonly denomination: MoneyDenominationType;
  public readonly counters: CountersType;

  constructor({
    denomination,
    counters,
  }: {
    denomination: MoneyDenominationType;
    counters?: Partial<CountersType>;
  }) {
    this.denomination = denomination;
    this.counters = {
      unit: new PerUnitCounter(counters?.unit?.count ?? 0),
      roll: denomination.rollCapacity
        ? new PerRollCounter(denomination.rollCapacity, counters?.roll?.count ?? 0)
        : undefined,
      weight: denomination.unitWeight
        ? new PerWeightCounter(denomination.unitWeight, counters?.weight?.count ?? 0)
        : undefined,
    };
  }

  /**
   * Returns the formatted label for the denomination in euros
   */
  public get label(): string {
    const euroVal = centToEuro(this.denomination.value);
    return `${euroVal >= 1 ? euroVal : euroVal.toFixed(2)}€`;
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
