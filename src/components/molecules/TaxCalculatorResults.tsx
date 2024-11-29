import { CircularProgress, Box, Typography } from "@mui/material";

interface TaxCalculatorResultsProps {
  error: Error | null;
  loading: boolean;
  results: any[];
}

const TaxCalculatorResults: React.FC<TaxCalculatorResultsProps> = ({
  error,
  loading,
  results,
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

  return results.map((result: any) => (
    <Box key={result.id} textAlign="center">
      <h2>{result.name}</h2>
      <p>{result.value}</p>
    </Box>
  ));
};

export default TaxCalculatorResults;
