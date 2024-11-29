/**
 * Custom hook to manage the state of fetching results from an API.
 *
 * @template T - The type of the results returned by the fetch API function.
 * @param {() => Promise<T[]>} fetchApiFunction - The function to fetch results from an API.
 * @returns {{
 *   loading: boolean;
 *   error: Error | null;
 *   results: T[];
 *   fetchResults: () => Promise<void>;
 * }} - An object containing the loading state, error state, results, and a function to fetch results.
 */
import { useState } from "react";

const useResults = <T>(fetchApiFunction: () => Promise<T[]>) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [results, setResults] = useState<T[]>([]);

  const fetchResults = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchApiFunction();
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
