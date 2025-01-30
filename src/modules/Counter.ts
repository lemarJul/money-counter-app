import { ICountStrategy, PerUnitStrategy } from "./CountStrategies";

export interface CounterParams {
  initialCount?: number;
  countStrategy?: ICountStrategy;
}

export class Counter {
  private _count;
  private countStrategy;

  constructor({
    initialCount = 0,
    countStrategy = new PerUnitStrategy(),
  }: CounterParams = {}) {
    this._count = initialCount;
    this.countStrategy = countStrategy;
  }

  // The following method seems unused in the whole project
  get countingUnit() {
    return this.countStrategy.countingUnit;
  }

  set count(n: number) {
    this._count = n < 0 ? 0 : n;
  }

  get count(): number {
    return this._count;
  }

  get unitQuantity(): number {
    return this.countStrategy.count(this._count);
  }
}
export type CounterType = typeof Counter;
