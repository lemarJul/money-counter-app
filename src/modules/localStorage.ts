import { DenominationCount } from "./DenominationCounter";
import type { DenominationCountInterface } from "./DenominationCounter.types";
import { EuroData } from "../data/Euro";
import type { MoneyDataType } from "../data/Euro";

// New type to match the new class structure
interface StoredDenomination {
  denomination: MoneyDataType;
  counterSet: {
    unit: { count: number };
    roll?: { count: number };
    weight?: { count: number };
  };
}

const STORAGE_KEY = "tillCount";

export const loadTillCount = (): DenominationCountInterface[] => {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored)
    return EuroData.map(
      (denomination) => new DenominationCount({ denomination })
    );

  try {
    const parsed = JSON.parse(stored);
    console.log({ parsed });

    // Validate parsed data structure
    if (!Array.isArray(parsed)) throw new Error("Stored data is not an array");

    // Validate array length matches MoneyDenominations
    if (parsed.length !== EuroData.length) {
      throw new Error(
        `Invalid array length: expected ${EuroData.length} items, got ${parsed.length}`
      );
    }

    // Validate each Denomination item
    for (let i = 0; i < parsed.length; i++) {
      const item = parsed[i];
      // Basic structure validation
      if (!item || typeof item !== "object") {
        throw new Error(`Invalid item at index ${i}: not an object`);
      }
      if (!("denomination" in item)) {
        throw new Error(`Invalid item at index ${i}: missing denomination`);
      }
      if (!("counterSet" in item) || typeof item.counterSet !== "object") {
        throw new Error(
          `Invalid item at index ${i}: invalid counterSet object`
        );
      }
      if (
        !("unit" in item.counterSet) ||
        typeof item.counterSet.unit !== "object" ||
        !("count" in item.counterSet.unit) ||
        typeof item.counterSet.unit.count !== "number"
      ) {
        throw new Error(`Invalid item at index ${i}: invalid unit counter`);
      }

      // Validate denomination exists in MoneyDenominations
      if (
        !EuroData.some(
          (d) =>
            d.value === item.denomination.value &&
            d.rollCapacity === item.denomination.rollCapacity &&
            d.unitWeight === item.denomination.unitWeight
        )
      ) {
        throw new Error(
          `Invalid item at index ${i}: denomination not found in MoneyDenominations`
        );
      }

      // Validate count values are non-negative
      if (item.counterSet.unit.count < 0) {
        throw new Error(`Invalid item at index ${i}: negative unit count`);
      }
      if (item.counterSet.roll && item.counterSet.roll.count < 0) {
        throw new Error(`Invalid item at index ${i}: negative roll count`);
      }
      if (item.counterSet.weight && item.counterSet.weight.count < 0) {
        throw new Error(`Invalid item at index ${i}: negative weight count`);
      }
    }

    return parsed.map((item: StoredDenomination) => {
      return new DenominationCount({
        denomination: item.denomination,
        countersInit: {
          unit: item.counterSet.unit.count,
          ...(item.counterSet.roll && { roll: item.counterSet.roll.count }),
          ...(item.counterSet.weight && {
            weight: item.counterSet.weight.count,
          }),
        },
      });
    });
  } catch (error) {
    console.error("Error loading till count from storage:", error);
    // Clear invalid data from localStorage
    localStorage.removeItem(STORAGE_KEY);
    return EuroData.map(
      (denomination) => new DenominationCount({ denomination })
    );
  }
};

export const storeTillCount = (tillCount: DenominationCountInterface[]) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(
      tillCount.map((denomination) => ({
        denomination: denomination.denomination,
        counterSet: {
          unit: { count: denomination.counterSet.unit.count },
          ...(denomination.counterSet.roll && {
            roll: { count: denomination.counterSet.roll.count },
          }),
          ...(denomination.counterSet.weight && {
            weight: { count: denomination.counterSet.weight.count },
          }),
        },
      }))
    )
  );
};
