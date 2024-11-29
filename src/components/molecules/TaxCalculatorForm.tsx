import SalaryInput from "../atoms/SalaryInput";
import YearPicker from "../atoms/YearPicker";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

interface TaxCalculatorFormProps {
  year: string;
  salary: string;
  disabled: boolean;
  onChange: (key: string, value: string) => void;
  onSubmit: () => void;
}

const TaxCalculatorForm: React.FC<TaxCalculatorFormProps> = ({
  year,
  salary,
  disabled,
  onChange,
  onSubmit,
}) => {
  const years = ["2019", "2020", "2021", "2022"];

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <SalaryInput
        value={salary}
        disabled={disabled}
        onChange={(value) => onChange("salary", value)}
      />
      <YearPicker
        value={year}
        onChange={(value) => onChange("year", value)}
        disabled={disabled}
        yearOptions={years}
      />
      <Box>
        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={disabled || !salary || !year}
        >
          Calculate
        </Button>
      </Box>
    </Box>
  );
};

export default TaxCalculatorForm;
