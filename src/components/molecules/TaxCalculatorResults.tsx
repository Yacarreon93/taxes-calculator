import { useMemo } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import { formatToDollars, formatToPercentage } from "../../utils/format";
import { TaxBracket } from "../../types";

interface TaxCalculatorResultsProps {
  error: Error | null;
  loading: boolean;
  salary: number;
  taxBrackets: TaxBracket[];
}

const TaxCalculatorResults: React.FC<TaxCalculatorResultsProps> = ({
  error,
  loading,
  salary,
  taxBrackets,
}) => {
  if (!!error) {
    return (
      <Box textAlign="center">
        <Typography color="error">
          Error fetching the data. Try again.
        </Typography>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box textAlign="center" margin="auto 0">
        <CircularProgress />
      </Box>
    );
  }

  const totalTaxes = useMemo(
    () => taxBrackets.reduce((acc, bracket) => acc + (bracket.taxes || 0), 0),
    [taxBrackets]
  );
  const effectiveRate = totalTaxes / salary;

  if (taxBrackets.length) {
    return (
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography variant="h6">
          Yearly Salary: <i>{formatToDollars(salary)}</i>
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Bracket </TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>Taxes per Bracket</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {taxBrackets.map((bracket: TaxBracket) => (
                <TableRow key={bracket.min}>
                  <TableCell>
                    {bracket.max
                      ? [
                          formatToDollars(bracket.min),
                          formatToDollars(bracket.max),
                        ].join(" - ")
                      : formatToDollars(bracket.min)}
                  </TableCell>
                  <TableCell>{formatToPercentage(bracket.rate)}</TableCell>
                  <TableCell>
                    <i>{formatToDollars(bracket.taxes || 0)}</i>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box alignSelf="flex-end" textAlign="right">
          <Typography variant="h6">
            Total Taxes: {formatToDollars(totalTaxes)}
          </Typography>
          <Typography>
            Effective Rate: {formatToPercentage(effectiveRate)}
          </Typography>
        </Box>
      </Box>
    );
  }
};

export default TaxCalculatorResults;
