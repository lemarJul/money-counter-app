import { countStrategyInterface, PerUnitStrategy } from "./CountStrategies";

export interface CounterConstructorParams {
  initialCount?: number;
  countStrategy?: countStrategyInterface;
  unitValue?: string;
  allowNegativeCount?: boolean;
}

export class Counter {
  private _count;
  private strategy;
  readonly allowNegativeCount;

  constructor(options: CounterConstructorParams) {
    this._count = options.initialCount || 0;
    this.strategy =
      options.countStrategy || new PerUnitStrategy(options.unitValue);
    this.allowNegativeCount = options.allowNegativeCount || false;
  }
  get unit() {
    return this.strategy.unit;
  }

  set count(n: number) {
    this._count = !this.allowNegativeCount && n < 0 ? 0 : n;
  }

  get count(): number {
    return this._count;
  }

  get unitQuantity(): number {
    return this.strategy.count(this._count);
  }
}
export type CounterType = typeof Counter;
