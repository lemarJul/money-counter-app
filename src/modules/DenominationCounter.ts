import { centToEuro } from "./utils";
import {
  createUnitCounter,
  createRollCounter,
  createPerGramCounter,
} from "./CounterFactory";

import type {
  DenominationCountInterface,
  counterSetType,
  InitialCountsType,
  ConstructorParams,
} from "./DenominationCounter.types";

import type { MoneyDataType } from "../data/Euro";

export class DenominationCount implements DenominationCountInterface {
  static createEmpty(denomination: MoneyDataType): DenominationCount {
    return new DenominationCount({
      denomination,
      countersInit: {
        unit: 0,
        ...(denomination.rollCapacity && { roll: 0 }),
        ...(denomination.unitWeight && { weight: 0 }),
      },
    });
  }

  public readonly denomination: MoneyDataType;
  public readonly counterSet: counterSetType;

  constructor({ denomination, countersInit }: ConstructorParams) {
    this.denomination = denomination;
    this.counterSet = this.initCounters(countersInit);
  }

  initCounters(initialCounts: InitialCountsType = {}): counterSetType {
    const counterSet: counterSetType = {
      unit: createUnitCounter({ initialCount: initialCounts?.unit ?? 0 }),
    };

    if (this.denomination.unitWeight) {
      counterSet.weight = createPerGramCounter({
        unitWeight: this.denomination.unitWeight,
        initialCount: initialCounts?.weight ?? 0,
      });
    }

    if (this.denomination.rollCapacity) {
      counterSet.roll = createRollCounter({
        capacity: this.denomination.rollCapacity,
        initialCount: initialCounts?.roll ?? 0,
      });
    }

    return counterSet;
  }

  get label(): string {
    const euroVal = centToEuro(this.denomination.value);
    return `${euroVal >= 1 ? euroVal : euroVal.toFixed(2)}€`;
  }

  get totalUnits(): number {
    return Object.values(this.counterSet)
      .map((counter) => counter?.unitQuantity ?? 0)
      .reduce((sum, count) => sum + count, 0);
  }

  get totalValue(): number {
    return centToEuro(this.totalUnits * this.denomination.value);
  }

  updateCounter(
    counterKey: keyof DenominationCountInterface["counterSet"],
    newValue: number
  ): DenominationCount {
    return new DenominationCount({
      denomination: this.denomination,
      countersInit: {
        unit: counterKey === "unit" ? newValue : this.counterSet.unit.count,
        ...(this.counterSet.roll && {
          roll: counterKey === "roll" ? newValue : this.counterSet.roll.count,
        }),
        ...(this.counterSet.weight && {
          weight:
            counterKey === "weight" ? newValue : this.counterSet.weight.count,
        }),
      },
    });
  }
}
