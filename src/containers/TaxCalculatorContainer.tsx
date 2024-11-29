import Container from "@mui/material/Container";
import TaxCalculatorForm from "../components/molecules/TaxCalculatorForm";
import { Box, Typography } from "@mui/material";

const TaxCalculatorContainer = () => {
  const handleSumit = () => {};

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography variant="h1">Tax Calculator</Typography>
        <TaxCalculatorForm onSubmit={handleSumit} />
      </Box>
    </Container>
  );
};

export default TaxCalculatorContainer;
