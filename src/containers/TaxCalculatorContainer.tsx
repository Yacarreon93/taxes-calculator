import { useState, useEffect } from "react";
import { Box, Typography, Container } from "@mui/material";
import TaxCalculatorForm from "../components/molecules/TaxCalculatorForm";
import TaxCalculatorResults from "../components/molecules/TaxCalculatorResults";

const TaxCalculatorContainer = () => {
  const [year, setYear] = useState("2022");
  const [salary, setSalary] = useState("");
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const fetchTaxData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5001/tax-calculator/tax-year/${year}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();

      setResults(result);
    } catch (err) {
      setError(err as Error);
    }

    setLoading(false);
  };

  const handleChange = (key: string, value: string) => {
    if (key === "year") {
      setYear(value);
    }
    if (key === "salary") {
      setSalary(value);
    }
  };

  const handleSumit = () => fetchTaxData();

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" gap={4}>
        <Typography variant="h1">Tax Calculator</Typography>
        <TaxCalculatorForm
          year={year}
          salary={salary}
          onChange={handleChange}
          onSubmit={handleSumit}
        />
        <TaxCalculatorResults
          error={error}
          loading={loading}
          results={results}
        />
      </Box>
    </Container>
  );
};

export default TaxCalculatorContainer;
