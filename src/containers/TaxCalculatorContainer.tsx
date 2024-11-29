import { useState, useCallback } from "react";
import { Box, Typography, Container } from "@mui/material";
import TaxCalculatorForm from "../components/molecules/TaxCalculatorForm";
import TaxCalculatorResults from "../components/molecules/TaxCalculatorResults";
import useResults from "../hooks/useResults";
import { fetchTrackBracketsApi } from "../services/api";

interface TaxBracket {
  min: number;
  max: number;
  rate: number;
}

const TaxCalculatorContainer = () => {
  const [year, setYear] = useState("2022");
  const [salary, setSalary] = useState("");

  const fetchTrackBrackets = useCallback(
    () => fetchTrackBracketsApi(year),
    [year]
  );

  const { loading, error, results, fetchResults } =
    useResults(fetchTrackBrackets);

  const handleChange = (key: string, value: string) => {
    if (key === "year") {
      setYear(value);
    }
    if (key === "salary") {
      setSalary(value);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" gap={4}>
        <Typography variant="h1">Tax Calculator</Typography>
        <TaxCalculatorForm
          year={year}
          salary={salary}
          onChange={handleChange}
          onSubmit={fetchResults}
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
