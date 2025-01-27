/**
 * Defines the valid unit types for money counting
 */
type UnitType = 'unit' | 'roll' | 'gram';

/**
 * Base counter class for counting money by individual units
 */
export class PerUnitCounter {
  private _count: number;

  public get count(): number {
    return this._count;
  }

  public set count(value: number) {
    this._count = value;
  }
  protected readonly unitType: UnitType = 'unit';

  constructor(count = 0) {
    this._count = count;
  }

  /**
   * Returns the unit label with proper pluralization
   */
  get unit(): string {
    return this.count > 1 ? `${this.unitType}s` : this.unitType;
  }

  /**
   * Returns the total number of individual units
   */
  get totalUnits(): number {
    return this.count;
  }
}

/**
 * Counter class for counting money by rolls (e.g., roll of coins)
 */
export class PerRollCounter extends PerUnitCounter {
  public readonly rollCapacity: number;
  protected readonly unitType: UnitType = 'roll';

  constructor(rollCapacity: number, count = 0) {
    super(count);
    this.rollCapacity = rollCapacity;
  }

  /**
   * Returns the total number of individual units based on roll capacity
   */
  get totalUnits(): number {
    return this.count * this.rollCapacity;
  }
}

/**
 * Counter class for counting money by weight
 */
export class PerWeightCounter extends PerUnitCounter {
  readonly #unitWeight: number;
  protected readonly unitType: UnitType = 'gram';

  constructor(unitWeight: number, count = 0) {
    super(count);
    this.#unitWeight = unitWeight;
  }

  /**
   * Returns the total number of individual units based on weight
   */
  get totalUnits(): number {
    return Math.floor(this.count / this.#unitWeight);
  }
}
