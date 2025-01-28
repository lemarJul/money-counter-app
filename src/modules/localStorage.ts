import { DenominationCount } from "./DenominationCounter";
import type { DenominationCountInterface } from "./DenominationCounter.types";
import { EuroData } from "../data/Euro";
import {
  validateStoredDenominations,
  hydrateDenominationCounts,
  dehydrateDenominationCount,
} from "./tillCount.hydration";

const STORAGE_KEY = "tillCount";

export const loadTillCount = (): DenominationCountInterface[] => {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return EuroData.map(
      (denomination) => new DenominationCount({ denomination })
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
    return EuroData.map(
      (denomination) => new DenominationCount({ denomination })
    );
  }
};

export const storeTillCount = (tillCount: DenominationCountInterface[]) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(tillCount.map(dehydrateDenominationCount))
  );
};
