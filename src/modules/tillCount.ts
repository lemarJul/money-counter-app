import { EuroData } from "../data/Euro";
import { DenominationCount } from "./DenominationCounter";

export const createTillCount = () => {
  return EuroData.map(
    (denomination) => new DenominationCount({ denomination })
  );
};
