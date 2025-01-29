import { DenominationCount } from "./DenominationCounter";
import type { DenominationCountInterface } from "./DenominationCounter.types";
import { EUR_DENOMINATIONS } from "../data/Euro";
import type { IDenomination } from "../data/Money.types";
import {
  validateStoredDenominations,
  hydrateDenominationCounts,
  dehydrateDenominationCount,
} from "./tillCount.hydration";

const STORAGE_KEY = "tillCount";

export const loadTillCount = (): DenominationCountInterface[] => {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return EUR_DENOMINATIONS.map((denomination: IDenomination) =>
      DenominationCount.createEmpty(denomination)
    );
  }

  try {
    const parsed = JSON.parse(stored);
    console.log({ parsed });

    validateStoredDenominations(parsed);
    return hydrateDenominationCounts(parsed);
  } catch (error) {
    console.error("Error loading till count from storage:", error);
    // Clear invalid data from localStorage
    localStorage.removeItem(STORAGE_KEY);
    return EUR_DENOMINATIONS.map((denomination: IDenomination) =>
      DenominationCount.createEmpty(denomination)
    );
  }
};

export const storeTillCount = (tillCount: DenominationCountInterface[]) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(tillCount.map(dehydrateDenominationCount))
  );
};
