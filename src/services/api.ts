import { TaxBracket } from "../types";

const API_ENDPOINT = "http://localhost:5001/tax-calculator/tax-year/";

/**
 * Fetches the tax brackets for a given year from the API.
 *
 * @param {string} year - The year for which to fetch the tax brackets.
 * @returns {Promise<TaxBracket[]>} A promise that resolves to an array of tax brackets.
 * @throws {Error} If the response from the API is not ok.
 */
export const fetchTrackBracketsApi = async (
  year: string
): Promise<TaxBracket[]> => {
  const response = await fetch(`${API_ENDPOINT}${year}`);

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const { tax_brackets } = await response.json();

  return tax_brackets;
};
