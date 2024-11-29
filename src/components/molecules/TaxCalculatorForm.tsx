import SalaryInput from "../atoms/SalaryInput";
import YearPicker from "../atoms/YearPicker";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { useState } from "react";

interface TaxCalculatorFormProps {
  initialYear?: number;
  initialSalary?: number;
  yearOptions: string[];
  disabled: boolean;
  onSubmit: (year: string, salary: string) => void;
}

const TaxCalculatorForm: React.FC<TaxCalculatorFormProps> = ({
  initialYear = "",
  initialSalary = "",
  yearOptions,
  disabled,
  onSubmit,
}) => {
  const [year, setYear] = useState(String(initialYear));
  const [salary, setSalary] = useState(String(initialSalary));

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <SalaryInput value={salary} disabled={disabled} onChange={setSalary} />
      <YearPicker
        value={year}
        disabled={disabled}
        yearOptions={yearOptions}
        onChange={setYear}
      />
      <Box>
        <Button
          variant="contained"
          onClick={() => onSubmit(year, salary)}
          disabled={disabled || !salary || !year}
        >
          Calculate
        </Button>
      </Box>
    </Box>
  );
};

export default TaxCalculatorForm;
