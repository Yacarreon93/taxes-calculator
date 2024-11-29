import { useState } from "react";

const useResults = <V, T>(
  fetchApiFunction: () => Promise<V[]>,
  processorFunction: (rawData: V[]) => T[]
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
      setError(error.message || "An error occurred");
    }
    setLoading(false);
  };

  return { loading, error, results, fetchResults };
};

export default useResults;
