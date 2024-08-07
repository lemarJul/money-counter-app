export type MoneyDenominationType = {
  readonly value: number;
  readonly rollCapacity?: number;
  readonly unitWeight?: number;
};

export const MoneyDenominations: MoneyDenominationType[] = [
  { value: 1, rollCapacity: 50, unitWeight: 2.3 },
  { value: 2, rollCapacity: 50, unitWeight: 3.06 },
  { value: 5, rollCapacity: 50, unitWeight: 3.92 },
  { value: 10, rollCapacity: 40, unitWeight: 4.1 },
  { value: 20, rollCapacity: 40, unitWeight: 5.74 },
  { value: 50, rollCapacity: 40, unitWeight: 7.8 },
  { value: 100, rollCapacity: 25, unitWeight: 7.5 },
  { value: 200, rollCapacity: 25, unitWeight: 8.5 },
  { value: 500 },
  { value: 1000 },
  { value: 2000 },
  { value: 5000 },
  { value: 10000 },
  { value: 20000 },
  { value: 50000 },
];   
