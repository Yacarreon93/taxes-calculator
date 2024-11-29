import { CircularProgress, Box, Typography } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { formatToDollars } from "../../utils/format";
import { TaxBracket } from "../../types";
import { useMemo } from "react";

interface TaxCalculatorResultsProps {
  error: Error | null;
  loading: boolean;
  salary: number;
  data: TaxBracket[];
}

const TaxCalculatorResults: React.FC<TaxCalculatorResultsProps> = ({
  error,
  loading,
  salary,
  data,
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
    () => data.reduce((acc, bracket) => acc + (bracket.taxes || 0), 0),
    [data]
  );
  const effectiveRate = totalTaxes / salary;

  if (data.length) {
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
              {data.map((bracket: TaxBracket) => (
                <TableRow key={bracket.min}>
                  <TableCell>
                    {bracket.max
                      ? [
                          formatToDollars(bracket.min),
                          formatToDollars(bracket.max),
                        ].join(" - ")
                      : formatToDollars(bracket.min)}
                  </TableCell>
                  <TableCell>{`${bracket.rate}%`}</TableCell>
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
          <Typography>Effective Rate: {effectiveRate.toFixed(2)}%</Typography>
        </Box>
      </Box>
    );
  }
};

export default TaxCalculatorResults;
