import { countStrategyInterface, PerUnitStrategy } from "./CountStrategies";

export interface CounterConstructorParams {
  initialCount?: number;
  countStrategy?: countStrategyInterface;
  allowNegativeCount?: boolean;
}

export class Counter {
  private _count;
  private countStrategy;
  readonly allowNegativeCount;

  constructor({
    initialCount = 0,
    countStrategy = new PerUnitStrategy(),
    allowNegativeCount = false,
  }: CounterConstructorParams = {}) {
    this._count = initialCount;
    this.countStrategy = countStrategy;
    this.allowNegativeCount = allowNegativeCount;
  }

  get countingUnit() {
    return this.countStrategy.countingUnit;
  }

  set count(n: number) {
    this._count = !this.allowNegativeCount && n < 0 ? 0 : n;
  }

  get count(): number {
    return this._count;
  }

  get unitQuantity(): number {
    return this.countStrategy.count(this._count);
  }
}
export type CounterType = typeof Counter;
