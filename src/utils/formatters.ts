/**
 * Format price with thousand separators and 2 decimal places if needed
 * @param price - The price to format
 * @returns Formatted price string
 */
export const formatPrice = (price: number): string => {
  return price.toLocaleString('en-GB', {
    minimumFractionDigits: price % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2
  });
};

/**
 * Calculate price with VAT
 * @param priceBeforeVAT - Price before VAT
 * @param vat - VAT percentage
 * @returns Price with VAT
 */
export const calculatePriceWithVAT = (priceBeforeVAT: number, vat: number): number => {
  return Math.round(priceBeforeVAT * (1 + vat / 100));
};

/**
 * Calculate total price based on weekly price and hire period
 * @param weeklyPrice - Price per week
 * @param hirePeriodDays - Hire period in days
 * @returns Total price
 */
export const calculateTotalPrice = (weeklyPrice: number, hirePeriodDays: number): number => {
  // Convert days to weeks (or fraction of a week)
  const weeks = hirePeriodDays / 7;
  return Math.round(weeklyPrice * weeks);
};
