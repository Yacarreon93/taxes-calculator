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
const getTaxesPerBracket = (bracket: TaxBracket, salary: number) => {
  const { min, max, rate } = bracket;
  const salaryInBracket = salary > max ? max : salary;
  const taxableSalary = salaryInBracket > min ? salaryInBracket - min : 0;

  return taxableSalary * rate;
};

/**
 * Processes the tax brackets to calculate the total tax for each bracket.
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

/**
 * Calculates the effective tax rate for a specific bracket based on the yearly salary.
 *
 * @param {Object} bracket - The tax bracket with min, max, and rate.
 * @param {number} bracket.min - The minimum income for the bracket.
 * @param {number} bracket.max - The maximum income for the bracket.
 * @param {number} bracket.rate - The tax rate for the bracket (as a decimal, e.g., 0.1 for 10%).
 * @param {number} salary - The yearly salary.
 * @returns {number} - The effective tax rate for the given bracket as a decimal.
 */
function getEffectiveRate(bracket: TaxBracket, salary: number) {
  const { min, max, rate } = bracket;

  // Determine the effective max income for this bracket
  const incomeInBracket = salary > max ? max : salary;

  // Calculate the taxable income for this bracket
  const taxableIncome = incomeInBracket > min ? incomeInBracket - min : 0;

  // Calculate the total tax for this bracket
  const tax = taxableIncome * rate;

  // Calculate the effective tax rate
  const effectiveRate = tax / salary;

  return effectiveRate;
}
