import type { ICurrencyMetadata } from "../data/Money.types";

/**
 * Converts a value from subunits to main units based on currency metadata
 * @param subunits - The value in subunits (e.g. cents) to convert
 * @param currencyMetaData - The currency metadata containing the base conversion value
 * @returns The value in main units (e.g. euros, dollars)
 */
export function convertFromSubunit(subunits: number, currencyMetaData: ICurrencyMetadata): number {
  return +(subunits / currencyMetaData.base);
}
