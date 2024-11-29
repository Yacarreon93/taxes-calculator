import { CircularProgress, Box, Typography } from "@mui/material";

interface TaxCalculatorResultsProps {
  isError: boolean;
  isLoading: boolean;
  results: any[];
}

const TaxCalculatorResults: React.FC<TaxCalculatorResultsProps> = ({
  isError,
  isLoading,
  results,
}) => {
  if (isError) {
    return (
      <Box textAlign="center">
        <Typography color="error">
          Error fetching the data. Try again.
        </Typography>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  return results.map((result: any) => (
    <Box key={result.id} textAlign="center">
      <h2>{result.name}</h2>
      <p>{result.value}</p>
    </Box>
  ));
};

export default TaxCalculatorResults;
