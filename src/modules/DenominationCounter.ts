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
}
