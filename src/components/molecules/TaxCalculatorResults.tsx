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

interface TaxCalculatorResultsProps {
  error: Error | null;
  loading: boolean;
  salary: number;
  data: any[];
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
                <TableCell>Band </TableCell>
                <TableCell>Rate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((result: any) => (
                <TableRow key={result.id}>
                  <TableCell>
                    {result.max
                      ? [
                          formatToDollars(result.min),
                          formatToDollars(result.max),
                        ].join(" - ")
                      : formatToDollars(result.min)}
                  </TableCell>
                  <TableCell>{`${result.rate}%`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
};

export default TaxCalculatorResults;
