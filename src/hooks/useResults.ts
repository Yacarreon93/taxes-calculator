/**
 * Custom hook to fetch and process results from an API.
 *
 * @template V - The type of the raw data fetched from the API.
 * @template T - The type of the processed data.
 *
 * @param {() => Promise<V[]>} fetchApiFunction - The function to fetch raw data from the API.
 * @param {(rawData: V[]) => T[]} processorFunction - The function to process the raw data into the desired format.
 *
 * @returns {{
 *   loading: boolean;
 *   error: Error | null;
 *   results: T[];
 *   fetchResults: () => Promise<void>;
 * }} An object containing the loading state, error state, processed results, and a function to fetch and process the results.
 */
import { useState } from "react";

const useResults = <V, T>(
  fetchApiFunction: () => Promise<V[]>,
  processorFunction: (rawData: V[]) => T[]
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [results, setResults] = useState<T[]>([]);

  const fetchResults = async () => {
    setLoading(true);
    setError(null);
    try {
      const rawData = await fetchApiFunction();
      const data = processorFunction(rawData);
      setResults(data);
    } catch (err) {
      const error = err as Error;
      setError(error);
    }
    setLoading(false);
  };

  return { loading, error, results, fetchResults };
};

export default useResults;
