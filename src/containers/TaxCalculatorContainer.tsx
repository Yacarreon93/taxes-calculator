import Container from "@mui/material/Container";
import TaxCalculatorForm from "../components/molecules/TaxCalculatorForm";
import { Typography } from "@mui/material";

const TaxCalculatorContainer = () => {
  const handleSumit = () => {};

  return (
    <Container maxWidth="sm">
      <Typography variant="h1">Tax Calculator</Typography>
      <TaxCalculatorForm onSubmit={handleSumit} />
    </Container>
  );
};

export default TaxCalculatorContainer;
