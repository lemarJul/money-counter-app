import { Counter, CounterParams } from "./Counter";
import { CountingUnitType, createStrategy } from "./CountStrategies";

export type CounterFactoryBaseOptions = Omit<CounterParams, "countStrategy">;

export type CreateCounterOptions = CounterFactoryBaseOptions & {
  countingUnit: CountingUnitType;
  capacityOrUnitWeight?: number;
};

export const createCounter = ({
  countingUnit,
  capacityOrUnitWeight,
  ...rest
}: CreateCounterOptions): Counter => {
  const strategy = createStrategy(countingUnit, capacityOrUnitWeight);
  return new Counter({
    ...rest,
    countStrategy: strategy,
  });
};
