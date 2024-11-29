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
