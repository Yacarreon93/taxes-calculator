import { useState, useCallback, useEffect } from "react";
import { Box, Typography, Container } from "@mui/material";
import TaxCalculatorForm from "../components/molecules/TaxCalculatorForm";
import TaxCalculatorResults from "../components/molecules/TaxCalculatorResults";
import useApiFetch from "../hooks/useApiFetch";
import { fetchTaxBracketsApi } from "../services/api";
import { processTaxBrackets } from "../utils/taxes";
import { TaxBracket, TaxBracketWithTaxes } from "../types";

const YEAR_OPTIONS = ["2022", "2021", "2020", "2019"];

const TaxCalculatorContainer = () => {
  const [year, setYear] = useState(Number(YEAR_OPTIONS[0]));
  const [salary, setSalary] = useState(0);
  const [taxBracketsWithTaxes, setTaxBracketsWithTaxes] = useState<
    TaxBracketWithTaxes[]
  >([]);

  const fetchTaxBrackets = useCallback(() => fetchTaxBracketsApi(year), [year]);

  const {
    loading,
    error,
    data: rawTaxBrackets,
    fetchData,
  } = useApiFetch<TaxBracket>(fetchTaxBrackets);

  const handleSubmit = (year: string, salary: string) => {
    setYear(Number(year));
    setSalary(Number(salary));
    fetchData();
  };

  useEffect(() => {
    setTaxBracketsWithTaxes(processTaxBrackets(rawTaxBrackets, salary));
  }, [rawTaxBrackets]);

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" gap={4} minHeight="100vh">
        <Typography variant="h1">Tax Calculator</Typography>
        <TaxCalculatorForm
          initialYear={year ? String(year) : ""}
          initialSalary={salary ? String(salary) : ""}
          yearOptions={YEAR_OPTIONS}
          disabled={loading}
          onSubmit={handleSubmit}
        />
        <TaxCalculatorResults
          salary={salary}
          taxBracketsWithTaxes={taxBracketsWithTaxes}
          error={error}
          loading={loading}
        />
      </Box>
    </Container>
  );
};

export default TaxCalculatorContainer;
