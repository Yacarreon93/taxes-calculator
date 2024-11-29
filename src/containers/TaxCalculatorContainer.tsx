import Container from "@mui/material/Container";
import TaxCalculatorForm from "../components/molecules/TaxCalculatorForm";

const TaxCalculatorContainer = () => {
  const handleSumit = () => {};

  return (
    <Container maxWidth="sm">
      <TaxCalculatorForm onSubmit={handleSumit} />
    </Container>
  );
};

export default TaxCalculatorContainer;
