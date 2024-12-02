import { TaxBracket } from "../types";

/**
 * Calculates the tax total for a specific bracket based on the yearly salary.
 *
 * @param {Object} bracket - The tax bracket with min, max, and rate.
 * @param {number} bracket.min - The minimum income for the bracket.
 * @param {number} bracket.max - The maximum income for the bracket.
 * @param {number} bracket.rate - The tax rate for the bracket (as a decimal, e.g., 0.1 for 10%).
 * @param {number} salary - The yearly salary.
 * @returns {number} - The total tax for the given bracket.
 */
export const getTaxesPerBracket = (bracket: TaxBracket, salary: number) => {
  const { min, max, rate } = bracket;
  const salaryInBracket = salary > max ? max : salary;
  const taxableSalary = salaryInBracket > min ? salaryInBracket - min : 0;

  return taxableSalary * rate;
};

/**
 * Processes the tax brackets to inject the total tax for each bracket.
 *
 * @param {Object[]} taxBrackets - The tax brackets.
 * @param {number} salary - The yearly salary.
 * @returns {Object[]} - The tax brackets with the total tax calculated.
 */
export const processTaxBrackets = (
  taxBrackets: TaxBracket[],
  salary: number
) => {
  return taxBrackets.map((bracket) => ({
    ...bracket,
    taxes: getTaxesPerBracket(bracket, salary || 0),
  }));
};
