import { Counter, CounterConstructorParams } from "./Counter";
import { PerGramStrategy, PerRollStrategy } from "./CountStrategies";

export type CounterFactoryOptions = Omit<
  CounterConstructorParams,
  "countStrategy"
>;

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
    countStrategy: new PerRollStrategy(capacity),
  });

export const createPerGramCounter = ({
  unitWeight,
  ...rest
}: PerGramCounterOptions): Counter =>
  new Counter({
    ...rest,
    countStrategy: new PerGramStrategy(unitWeight),
  });
