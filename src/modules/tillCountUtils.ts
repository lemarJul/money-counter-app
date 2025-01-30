import { DenominationCounter } from "./DenominationCounter";
import { ICurrencyMetadata, IDenomination } from "../data/Money.types";
import { CountsStateType } from "./DenominationCounter.types";

export interface CountsStateWithId extends CountsStateType {
  id: string;
}

export const STORAGE_KEY = "tillCount";

export interface StoredTillCountNew {
  state?: CountsStateWithId[];
  currencyMetaData: ICurrencyMetadata;
  denominations: readonly IDenomination[];
}

export function createTillCount(
  currencyMetaData: ICurrencyMetadata,
  denominations: readonly IDenomination[],
  state?: readonly CountsStateWithId[]
): DenominationCounter[] {
  return denominations.map((denomination) => {
    const counterState = state?.find((s) => s.id === denomination.id);
    const countersState: Partial<CountsStateType> = {};

    if (counterState) {
      if (typeof counterState.unit === "number")
        countersState.unit = counterState.unit;
      if (typeof counterState.roll === "number")
        countersState.roll = counterState.roll;
      if (typeof counterState.weight === "number")
        countersState.weight = counterState.weight;
    }

    return new DenominationCounter({
      denomination,
      ...(Object.keys(countersState).length > 0 && { countersState }),
      currencyMetaData,
    });
  });
}

export const hydrateTillCountFromStorage = (
  currencyMetaData: ICurrencyMetadata,
  denominations: readonly IDenomination[],
  stored: unknown
): DenominationCounter[] => {
  try {
    if (!stored || typeof stored !== "object") {
      return createTillCount(currencyMetaData, denominations);
    }

    const parsed = stored;
    // Validate parsed data structure
    if (!parsed || typeof parsed !== "object") {
      throw new Error("Invalid stored data: not an object");
    }

    // Now we can safely cast
    const typedParsed = parsed as StoredTillCountNew;

    // Verify currency matches
    if (typedParsed.currencyMetaData.code !== currencyMetaData.code) {
      return createTillCount(currencyMetaData, denominations);
    }

    if (!typedParsed.state || !Array.isArray(typedParsed.state)) {
      throw new Error("Invalid stored data: state is not an array");
    }

    // Create a new till count
    const tillCount = createTillCount(currencyMetaData, denominations);

    // Update the counts based on stored state
    typedParsed.state.forEach((state) => {
      const counter = tillCount.find((c) => c.denomination.id === state.id);
      if (counter) {
        if (state.unit !== undefined)
          counter.counterSet.unit.count = state.unit;
        if (state.weight !== undefined && counter.counterSet.weight) {
          counter.counterSet.weight.count = state.weight;
        }
        if (state.roll !== undefined && counter.counterSet.roll) {
          counter.counterSet.roll.count = state.roll;
        }
      }
    });

    return tillCount;
  } catch (error) {
    console.error("Error loading till count from storage:", error);
    // Clear invalid data from localStorage
    localStorage.removeItem(STORAGE_KEY);
    return createTillCount(currencyMetaData, denominations);
  }
};

// export const storeTillCount = (
//   tillCount: IDenominationCounter[],
//   currencyMetaData: ICurrencyMetadata,
//   denominations: readonly IDenomination[]
// ) => {
//   const data: StoredTillCountNew = {
//     currencyMetaData,
//     denominations,
//     state: tillCount.map(
//       (denomination): CountsStateWithId => ({
//         id: denomination.denomination.id,
//         ...(denomination.counterSet.unit.count && {
//           unit: denomination.counterSet.unit.count,
//         }),
//         ...(denomination?.counterSet?.weight?.count && {
//           weight: denomination.counterSet.weight.count,
//         }),
//         ...(denomination?.counterSet?.roll?.count && {
//           roll: denomination.counterSet.roll.count,
//         }),
//       })
//     ),
//   };

//   console.log("store till count", data);

//   localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
// };
