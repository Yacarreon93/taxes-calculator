import { useState, useCallback } from "react";
import { Box, Typography, Container } from "@mui/material";
import TaxCalculatorForm from "../components/molecules/TaxCalculatorForm";
import TaxCalculatorResults from "../components/molecules/TaxCalculatorResults";
import useApiFetch from "../hooks/useApiFetch";
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

  const { loading, error, data, fetchData } = useApiFetch(fetchTrackBrackets);

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
      <Box display="flex" flexDirection="column" gap={4} minHeight="100vh">
        <Typography variant="h1">Tax Calculator</Typography>
        <TaxCalculatorForm
          year={year}
          salary={salary}
          onChange={handleChange}
          onSubmit={fetchData}
        />
        <TaxCalculatorResults error={error} loading={loading} data={data} />
      </Box>
    </Container>
  );
};

export default TaxCalculatorContainer;
