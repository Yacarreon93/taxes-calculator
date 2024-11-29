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
  data: any[];
}

const TaxCalculatorResults: React.FC<TaxCalculatorResultsProps> = ({
  error,
  loading,
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
      <Box textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  if (data.length) {
    return (
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
    );
  }
};

export default TaxCalculatorResults;
