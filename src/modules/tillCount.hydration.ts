import { DenominationCount } from "./DenominationCounter";
import type { DenominationCountInterface } from "./DenominationCounter.types";
import { EUR_DENOMINATIONS } from "../data/Euro";
import type { IDenomination } from "../data/Money.types";

interface StoredDenomination {
  denomination: IDenomination;
  counterSet: {
    unit: { count: number };
    roll?: { count: number };
    weight?: { count: number };
  };
}

export const validateStoredDenomination = (
  item: unknown,
  index: number
): item is StoredDenomination => {
  if (!item || typeof item !== "object") {
    throw new Error(`Invalid item at index ${index}: not an object`);
  }

  const typedItem = item as StoredDenomination;

  if (!("denomination" in typedItem)) {
    throw new Error(`Invalid item at index ${index}: missing denomination`);
  }
  if (!("counterSet" in typedItem) || typeof typedItem.counterSet !== "object") {
    throw new Error(`Invalid item at index ${index}: invalid counterSet object`);
  }
  if (
    !("unit" in typedItem.counterSet) ||
    typeof typedItem.counterSet.unit !== "object" ||
    !("count" in typedItem.counterSet.unit) ||
    typeof typedItem.counterSet.unit.count !== "number"
  ) {
    throw new Error(`Invalid item at index ${index}: invalid unit counter`);
  }

  // Validate denomination exists in MoneyDenominations
  if (
    !EUR_DENOMINATIONS.some(
      (d) =>
        d.value === typedItem.denomination.value &&
        d.rollCapacity === typedItem.denomination.rollCapacity &&
        d.unitWeight === typedItem.denomination.unitWeight
    )
  ) {
    throw new Error(
      `Invalid item at index ${index}: denomination not found in MoneyDenominations`
    );
  }

  // Validate count values are non-negative
  if (typedItem.counterSet.unit.count < 0) {
    throw new Error(`Invalid item at index ${index}: negative unit count`);
  }
  if (typedItem.counterSet.roll && typedItem.counterSet.roll.count < 0) {
    throw new Error(`Invalid item at index ${index}: negative roll count`);
  }
  if (typedItem.counterSet.weight && typedItem.counterSet.weight.count < 0) {
    throw new Error(`Invalid item at index ${index}: negative weight count`);
  }

  return true;
};

export const validateStoredDenominations = (
  data: unknown
): data is StoredDenomination[] => {
  if (!Array.isArray(data)) {
    throw new Error("Data is not an array");
  }

  if (data.length !== EuroData.length) {
    throw new Error(
      `Invalid array length: expected ${EuroData.length} items, got ${data.length}`
    );
  }

  data.forEach((item, index) => validateStoredDenomination(item, index));
  return true;
};

export const hydrateDenominationCount = (
  item: StoredDenomination
): DenominationCount => {
  return new DenominationCount({
    denomination: item.denomination,
    countersInit: {
      unit: item.counterSet.unit.count,
      ...(item.counterSet.roll && { roll: item.counterSet.roll.count }),
      ...(item.counterSet.weight && { weight: item.counterSet.weight.count }),
    },
  });
};

export const hydrateDenominationCounts = (
  counts: DenominationCountInterface[]
): DenominationCount[] => {
  return counts.map((count) =>
    hydrateDenominationCount(count as StoredDenomination)
  );
};

export const dehydrateDenominationCount = (
  denomination: DenominationCountInterface
): StoredDenomination => ({
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
});
