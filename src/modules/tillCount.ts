import { EUR_DENOMINATIONS } from "../data/Euro";
import { DenominationCount } from "./DenominationCounter";

export const createTillCount = () => {
  return EUR_DENOMINATIONS.map(
    (denomination) => new DenominationCount({ denomination })
  );
};
