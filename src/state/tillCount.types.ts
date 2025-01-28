import { MoneyDataType } from "../data/Euro";

export interface StoredTillCount {
  denomination: MoneyDataType;
  counters: {
    unit: StoredCounter;
    roll?: StoredCounter;
    weight?: StoredCounter;
  };
}

export interface StoredCounter {
  count: number;
}
