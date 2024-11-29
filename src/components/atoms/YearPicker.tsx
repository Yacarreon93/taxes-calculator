import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

interface YearPickerProps {
  value: string;
  disabled: boolean;
  yearOptions: string[];
  onChange: (value: string) => void;
}

const YearPicker: React.FC<YearPickerProps> = ({
  value,
  disabled,
  yearOptions,
  onChange,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel disabled={disabled} id="year-select-label">
        Select Year
      </InputLabel>
      <Select
        label="Select Year"
        labelId="year-select-label"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      >
        {yearOptions.map((year: string) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default YearPicker;
