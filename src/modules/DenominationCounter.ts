import type { ICurrencyMetadata, IDenomination } from "../data/Money.types";
import type {
  IDenominationCounter,
  counterSetType,
  CountsStateType,
} from "./DenominationCounter.types";
import { createCounter } from "./CounterFactory";
import { convertFromSubunit } from "./utils";

export class DenominationCounter implements IDenominationCounter {
  public readonly denomination: IDenomination;
  public readonly counterSet: counterSetType;
  public readonly currencyMetaData: ICurrencyMetadata;

  constructor({
    denomination,
    currencyMetaData,
    countersState,
  }: {
    denomination: IDenomination;
    countersState?: CountsStateType;
    currencyMetaData: ICurrencyMetadata;
  }) {
    this.denomination = denomination;
    this.currencyMetaData = currencyMetaData;
    this.counterSet = this.initCounters(countersState);
  }

  initCounters(countersState: CountsStateType = {}): counterSetType {
    const counterSet: counterSetType = {
      unit: createCounter({
        countingUnit: "unit",
        initialCount: countersState?.unit ?? 0,
      }),
    };

    if (this.denomination.unitWeight) {
      counterSet.weight = createCounter({
        countingUnit: "gram",
        capacityOrUnitWeight: this.denomination.unitWeight,
        initialCount: countersState?.weight ?? 0,
      });
    }

    if (this.denomination.rollCapacity) {
      counterSet.roll = createCounter({
        countingUnit: "roll",
        capacityOrUnitWeight: this.denomination.rollCapacity,
        initialCount: countersState?.roll ?? 0,
      });
    }

    return counterSet;
  }

  get formattedValue(): string {
    const value = convertFromSubunit(
      this.denomination.value,
      this.currencyMetaData
    );
    return `${value >= 1 ? value : value.toFixed(2)}${
      this.currencyMetaData.symbol
    }`;
  }

  get totalUnits(): number {
    return Object.values(this.counterSet)
      .map((counter) => counter?.unitQuantity ?? 0)
      .reduce((sum, count) => sum + count, 0);
  }

  get totalValue(): number {
    return convertFromSubunit(
      this.totalUnits * this.denomination.value,
      this.currencyMetaData
    );
  }

  updateCounter(
    counterKey: keyof IDenominationCounter["counterSet"],
    newValue: number
  ): DenominationCounter {
    return new DenominationCounter({
      denomination: this.denomination,
      countersState: {
        unit: counterKey === "unit" ? newValue : this.counterSet.unit.count,
        ...(this.counterSet.roll && {
          roll: counterKey === "roll" ? newValue : this.counterSet.roll.count,
        }),
        ...(this.counterSet.weight && {
          weight:
            counterKey === "weight" ? newValue : this.counterSet.weight.count,
        }),
      },
      currencyMetaData: this.currencyMetaData,
    });
  }
}
