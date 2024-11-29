import { useState, useCallback } from "react";
import { Box, Typography, Container } from "@mui/material";
import TaxCalculatorForm from "../components/molecules/TaxCalculatorForm";
import TaxCalculatorResults from "../components/molecules/TaxCalculatorResults";
import useApiFetch from "../hooks/useApiFetch";
import { fetchTrackBracketsApi } from "../services/api";

const YEAR_OPTIONS = ["2022", "2021", "2020", "2019"];

const TaxCalculatorContainer = () => {
  const [year, setYear] = useState<number>(Number(YEAR_OPTIONS[0]));
  const [salary, setSalary] = useState<number>();

  const fetchTrackBrackets = useCallback(
    () => fetchTrackBracketsApi(year),
    [year]
  );

  const { loading, error, data, fetchData } = useApiFetch(fetchTrackBrackets);

  const handleSubmit = (year: string, salary: string) => {
    setYear(Number(year));
    setSalary(Number(salary));
    fetchData();
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" gap={4} minHeight="100vh">
        <Typography variant="h1">Tax Calculator</Typography>
        <TaxCalculatorForm
          initialYear={year}
          initialSalary={salary}
          yearOptions={YEAR_OPTIONS}
          disabled={loading}
          onSubmit={handleSubmit}
        />
        <TaxCalculatorResults
          data={data}
          salary={Number(salary)}
          error={error}
          loading={loading}
        />
      </Box>
    </Container>
  );
};

export default TaxCalculatorContainer;
