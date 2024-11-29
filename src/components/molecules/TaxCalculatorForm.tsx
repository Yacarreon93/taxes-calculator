import { useState } from "react";
import SalaryInput from "../atoms/SalaryInput";
import YearPicker from "../atoms/YearPicker";
import Button from "@mui/material/Button";

interface TaxCalculatorFormProps {
  onSubmit: (salary: string, year: string) => void;
}

const TaxCalculatorForm: React.FC<TaxCalculatorFormProps> = ({ onSubmit }) => {
  const [salary, setSalary] = useState("");
  const [year, setYear] = useState("");

  const years = ["2019", "2020", "2021", "2022"];

  const handleSubmit = () => onSubmit(salary, year);

  return (
    <div>
      <SalaryInput value={salary} onChange={setSalary} />
      <YearPicker value={year} onChange={setYear} yearOptions={years} />
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={!salary || !year}
        style={{ marginTop: "16px" }}
      >
        Calculate Taxes
      </Button>
    </div>
  );
};

export default TaxCalculatorForm;
