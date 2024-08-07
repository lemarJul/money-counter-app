

export class PerUnitCounter {
  public count: number;
  protected _unit = "unit";

  constructor(count = 0) {
    this.count = count;
  }
  get unit() {
    return this.count > 1 ? this._unit + "s" : this._unit;
  }
  get totalUnits(): number {
    return this.count;
  }
}

export class PerRollCounter extends PerUnitCounter {
  readonly rollCapacity: number;
  _unit = "roll";

  constructor(rollCapacity: number, count = 0) {
    super(count);
    this.rollCapacity = rollCapacity;
  }
  get totalUnits(): number {
    return this.count * this.rollCapacity;
  }
}

export class PerWeightCounter extends PerUnitCounter {
  readonly #unitWeight: number;
  _unit = "gram";

  constructor(unitWeight: number, count = 0) {
    super(count);
    this.#unitWeight = unitWeight;
  }
  get totalUnits(): number {
    return Math.floor(this.count / this.#unitWeight);
  }
}
