/**
 * Formats a given number to a string representing US dollars.
 *
 * @param amount - The numeric amount to be formatted.
 * @returns A string formatted as US dollars.
 */
export const formatToDollars = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

/**
 * Adds commas to a given numeric string.
 *
 * @param amount - The numeric amount to be formatted.
 * @returns A numeric string formatted with commas.
 */
export const formatNumberWithCommas = (amount: string): string => {
  const numericValue = amount.replace(/\D/g, "");

  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
