import { useState } from "react";
import { Box, Typography, Container } from "@mui/material";
import TaxCalculatorForm from "../components/molecules/TaxCalculatorForm";
import TaxCalculatorResults from "../components/molecules/TaxCalculatorResults";

const TaxCalculatorContainer = () => {
  const [results, setResults] = useState([]);

  const handleSumit = () => {};

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" gap={4}>
        <Typography variant="h1">Tax Calculator</Typography>
        <TaxCalculatorForm onSubmit={handleSumit} />
        <TaxCalculatorResults
          isLoading={true}
          isError={true}
          results={results}
        />
      </Box>
    </Container>
  );
};

export default TaxCalculatorContainer;
