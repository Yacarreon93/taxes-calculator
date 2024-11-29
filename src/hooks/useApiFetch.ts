/**
 * Custom hook to manage the state of fetching data from an API.
 *
 * @template T - The type of the data returned by the fetch API function.
 * @param {() => Promise<T[]>} fetchApiFunction - The function to fetch data from an API.
 * @returns {{
 *   loading: boolean;
 *   error: Error | null;
 *   data: T[];
 *   fetchdata: () => Promise<void>;
 * }} - An object containing the loading state, error state, data, and a function to fetch data.
 */
import { useState } from "react";

const useApiFetch = <T>(fetchApiFunction: () => Promise<T[]>) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setdata] = useState<T[]>([]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchApiFunction();
      setdata(data);
    } catch (err) {
      const error = err as Error;
      setError(error);
    }
    setLoading(false);
  };

  return { loading, error, data, fetchData };
};

export default useApiFetch;
