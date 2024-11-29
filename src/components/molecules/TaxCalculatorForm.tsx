import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import YearPicker from "../atoms/YearPicker";
import SalaryInput from "../atoms/SalaryInput";

interface TaxCalculatorFormProps {
  initialYear?: string;
  initialSalary?: string;
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
  const [year, setYear] = useState(initialYear);
  const [salary, setSalary] = useState(initialSalary);

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
