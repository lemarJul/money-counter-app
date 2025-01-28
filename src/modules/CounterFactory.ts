import { Counter, CounterConstructorParams } from "./Counter";
import { PerWeightStrategy, PerPackageStrategy } from "./CountStrategies";

export type CounterFactoryOptions = Omit<
  CounterConstructorParams,
  "countStrategy"
>;

export type CounterUnitValue = "unit" | "roll" | "gram";

export type RollCounterOptions = CounterFactoryOptions & {
  capacity: number;
};

export type PerGramCounterOptions = CounterFactoryOptions & {
  unitWeight: number;
};

export const createUnitCounter = (options: CounterFactoryOptions): Counter =>
  new Counter(options);

export const createRollCounter = ({
  capacity,
  ...rest
}: RollCounterOptions): Counter =>
  new Counter({
    ...rest,
    countStrategy: new PerPackageStrategy(capacity, "roll"),
  });

export const createPerGramCounter = ({
  unitWeight,
  ...rest
}: PerGramCounterOptions): Counter =>
  new Counter({
    ...rest,
    countStrategy: new PerWeightStrategy(unitWeight, "gram"),
  });
