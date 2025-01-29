//* ---------------------
//* STRATEGIES
//* ---------------------

export interface countStrategyInterface {
  readonly countingUnit: CountingUnitType;

  count(n: number): number;
}
export type CountingUnitType = "unit" | "roll" | "gram";

export class PerUnitStrategy implements countStrategyInterface {
  readonly countingUnit = "unit";
  constructor() {}

  count(n: number): number {
    return n;
  }
}

export class PerRollStrategy implements countStrategyInterface {
  readonly countingUnit = "roll";
  constructor(private capacity: number) {}

  count(n: number): number {
    return n * this.capacity;
  }
}

export class PerGramStrategy implements countStrategyInterface {
  readonly countingUnit = "gram";
  constructor(private unitWeight: number) {}

  count(n: number): number {
    return Math.floor(n / this.unitWeight);
  }
}
