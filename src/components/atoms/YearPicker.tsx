import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

interface YearPickerProps {
  value: string;
  onChange: (value: string) => void;
  yearOptions: string[];
}

const YearPicker: React.FC<YearPickerProps> = ({
  value,
  onChange,
  yearOptions,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="year-select-label">Select Year</InputLabel>
      <Select
        labelId="year-select-label"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label="Select Year"
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
