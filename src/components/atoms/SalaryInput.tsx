import TextField from "@mui/material/TextField";

interface SalaryInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SalaryInput: React.FC<SalaryInputProps> = ({ value, onChange }) => {
  return (
    <TextField
      label="Yearly Salary"
      variant="outlined"
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      slotProps={{
        htmlInput: {
          min: 0, // Ensures no negative values
        },
      }}
      margin="normal"
    />
  );
};

export default SalaryInput;
