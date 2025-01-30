export interface ICountStrategy {
  readonly countingUnit: CountingUnitType;
  count(n: number): number;
}
export type CountingUnitType = "unit" | "roll" | "gram";

export class PerUnitStrategy implements ICountStrategy {
  readonly countingUnit = "unit";
  count(n: number): number {
    return n;
  }
}

export class PerRollStrategy implements ICountStrategy {
  readonly countingUnit = "roll";
  constructor(private capacity: number) {}
  count(n: number): number {
    return n * this.capacity;
  }
}

export class PerGramStrategy implements ICountStrategy {
  readonly countingUnit = "gram";
  constructor(private unitWeight: number) {}
  count(n: number): number {
    return Math.floor(n / this.unitWeight);
  }
}

export function createStrategy(
  unit: CountingUnitType | undefined,
  capacityOrUnitWeight?: number
): ICountStrategy {
  switch (unit) {
    case "unit":
      return new PerUnitStrategy();
    case "roll":
      return new PerRollStrategy(capacityOrUnitWeight!);
    case "gram":
      return new PerGramStrategy(capacityOrUnitWeight!);
    default:
      throw new Error("Invalid counting unit");
  }
}

// export const createStrategy2 = (
//   unitWeight: number,
//   rollCapacity: number
// ): Record<string, ICountStrategy> => {
//   const PerUnit: ICountStrategy = {
//     countingUnit: "unit",
//     count(n: number): number {
//       return n;
//     },
//   };

//   const PerRoll: ICountStrategy = {
//     countingUnit: "roll",
//     count(n: number): number {
//       return n * rollCapacity;
//     },
//   };

//   const PerGram: ICountStrategy = {
//     countingUnit: "gram",
//     count(n: number): number {
//       return Math.floor(n / unitWeight);
//     },
//   };

//   return { PerUnit, PerRoll, PerGram };
// };
