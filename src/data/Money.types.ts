/**
 * Generic interfaces for currency denominations that can be used across different currencies.
 * These interfaces define the common structure that all currency implementations must follow.
 */

export interface ICurrencyMetadata {
  readonly code: string; // ISO 4217 currency code (e.g., "EUR", "USD")
  readonly symbol: string; // Currency symbol (e.g., "€", "$")
  readonly name: string; // Full currency name (e.g., "Euro", "US Dollar")
  readonly subunit: string; // Name of the subunit (e.g., "Cent", "Penny")
  readonly base: number; // Number of subunits in one unit (e.g., 100 cents = 1 euro)
}

export interface IDenomination {
  readonly id: string; // Unique identifier for the denomination
  readonly value: number; // Value in subunits (e.g., 100 for 1€)
  readonly rollCapacity?: number; // Number of units in a roll (for coins)
  readonly unitWeight?: number; // Weight in grams (for coins)
  readonly isSubunit: boolean; // Whether this is a subunit denomination
}

/**
 * Euro-specific implementation
 */
