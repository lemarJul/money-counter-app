//* ---------------------
//* STRATEGIES
//* ---------------------
export interface countStrategyInterface {
  readonly unit: string;

  count(n: number): number;
}

export class PerUnitStrategy implements countStrategyInterface {
  constructor(readonly unit = "unit") {}

  count(n: number): number {
    return n;
  }
}

export class PerPackageStrategy implements countStrategyInterface {
  constructor(private capacity: number, readonly unit = "package") {}

  count(n: number): number {
    return n * this.capacity;
  }
}

export class PerWeightStrategy implements countStrategyInterface {
  constructor(private unitWeight: number, readonly unit = "gram") {}

  count(n: number): number {
    return Math.floor(n / this.unitWeight);
  }
}
