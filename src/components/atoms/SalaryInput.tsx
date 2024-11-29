import { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

interface SalaryInputProps {
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

const formatNumberWithCommas = (value: string): string => {
  const numericValue = value.replace(/\D/g, "");

  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const SalaryInput: React.FC<SalaryInputProps> = ({
  value,
  disabled,
  onChange,
}) => {
  const [displayValue, setDisplayValue] = useState(
    formatNumberWithCommas(value)
  );

  // Remove commas from the input value and update the display value
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/,/g, "");
    setDisplayValue(formatNumberWithCommas(newValue));
    onChange(newValue);
  };

  return (
    <TextField
      fullWidth
      label="Yearly Salary"
      variant="outlined"
      type="text" // Use text for formatted input instead of number
      value={displayValue}
      disabled={disabled}
      onChange={handleInputChange}
      slotProps={{
        htmlInput: {
          min: 0,
        },
        input: {
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        },
      }}
    />
  );
};

export default SalaryInput;
