import { useState, useCallback, useEffect } from "react";
import { Box, Typography, Container } from "@mui/material";
import TaxCalculatorForm from "../components/molecules/TaxCalculatorForm";
import TaxCalculatorResults from "../components/molecules/TaxCalculatorResults";
import useApiFetch from "../hooks/useApiFetch";
import { fetchTaxBracketsApi } from "../services/api";
import { TaxBracket } from "../types";
import { getTaxesPerBracket } from "../utils/taxes";

const YEAR_OPTIONS = ["2022", "2021", "2020", "2019"];

const TaxCalculatorContainer = () => {
  const [year, setYear] = useState(Number(YEAR_OPTIONS[0]));
  const [salary, setSalary] = useState<number>();
  const [data, setData] = useState<TaxBracket[]>([]);
  const [total, setTotal] = useState(0);

  const fetchTaxBrackets = useCallback(() => fetchTaxBracketsApi(year), [year]);

  const {
    loading,
    error,
    data: taxBrackets,
    fetchData,
  } = useApiFetch<TaxBracket>(fetchTaxBrackets);

  const handleSubmit = (year: string, salary: string) => {
    setYear(Number(year));
    setSalary(Number(salary));
    fetchData();
  };

  const processTaxBrackets = (taxBrackets: TaxBracket[]) => {
    return taxBrackets.map((bracket) => ({
      ...bracket,
      total: getTaxesPerBracket(bracket, salary || 0),
    }));
  };

  useEffect(() => {
    setData(processTaxBrackets(taxBrackets));
  }, [taxBrackets]);

  useEffect(() => {
    const total = data.reduce((acc, bracket) => acc + (bracket.total || 0), 0);
    setTotal(total);
  }, [data]);

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
          total={total}
          salary={Number(salary)}
          error={error}
          loading={loading}
        />
      </Box>
    </Container>
  );
};

export default TaxCalculatorContainer;
