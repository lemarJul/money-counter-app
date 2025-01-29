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

import type { IDenomination } from "../data/Money.types";
import { EUR } from "../data/Euro";

export class DenominationCount implements DenominationCountInterface {
  static createEmpty(denomination: IDenomination): DenominationCount {
    return new DenominationCount({
      denomination,
      countersInit: {
        unit: 0,
        ...(denomination.rollCapacity && { roll: 0 }),
        ...(denomination.unitWeight && { weight: 0 }),
      },
    });
  }

  public readonly denomination: IDenomination;
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
    // TODO: Make this generic for all currencies
    // For now, keeping Euro-specific logic until currency formatting is properly abstracted
    const value = centToEuro(this.denomination.value);
    return `${value >= 1 ? value : value.toFixed(2)}${EUR.symbol}`;
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
