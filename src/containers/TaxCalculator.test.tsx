import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import TaxCalculatorContainer from "../containers/TaxCalculatorContainer";
import { processTaxBrackets } from "../utils/taxes";
import useApiFetch from "../hooks/useApiFetch";

vi.mock("../utils/taxes", () => ({
  processTaxBrackets: vi.fn(),
}));

vi.mock("../services/api", () => ({
  fetchTaxBracketsApi: vi.fn(),
}));

vi.mock("../hooks/useApiFetch", () => ({
  default: vi.fn(),
}));

describe("TaxCalculatorContainer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  //   it("renders the initial state correctly", () => {
  //     (useApiFetch as vi.Mock).mockReturnValue({
  //       error: null,
  //       loading: false,
  //       data: [],
  //       fetchData: vi.fn(),
  //     });

  //     render(<TaxCalculatorContainer />);

  //     expect(screen.getByText("Tax Calculator")).toBeInTheDocument();
  //     expect(screen.getByLabelText("Yearly Salary")).toBeInTheDocument();
  //     expect(screen.getByLabelText("Select Year")).toBeInTheDocument();
  //     expect(screen.getByText("Calculate")).toBeInTheDocument();
  //   });

  //   it("calls fetchTaxBracketsApi on form submission", async () => {
  //     const mockFetchData = vi.fn();
  //     (useApiFetch as vi.Mock).mockReturnValue({
  //       error: null,
  //       loading: false,
  //       data: [],
  //       fetchData: mockFetchData,
  //     });

  //     render(<TaxCalculatorContainer />);

  //     const salaryInput = screen.getByLabelText("Yearly Salary");
  //     const submitButton = screen.getByText("Calculate");

  //     fireEvent.change(salaryInput, { target: { value: "50000" } });
  //     fireEvent.click(submitButton);

  //     expect(mockFetchData).toHaveBeenCalled();
  //   });

  it("displays results correctly after processing tax brackets", async () => {
    const mockProcessedTaxBrackets = [
      { min: 0, max: 100000, rate: 0.1, taxes: 5000 },
    ];

    (useApiFetch as vi.Mock).mockReturnValue({
      error: null,
      loading: false,
      data: [{ min: 0, max: 100000, rate: 10 }],
      fetchData: vi.fn(),
    });

    (processTaxBrackets as vi.Mock).mockReturnValue(mockProcessedTaxBrackets);

    render(<TaxCalculatorContainer />);
    screen.debug();

    const salaryInput = screen.getByLabelText("Yearly Salary");
    const submitButton = screen.getByText("Calculate");

    fireEvent.change(salaryInput, { target: { value: "50000" } });
    fireEvent.click(submitButton);

    expect(screen.getByText("Total Taxes: $5,000.00")).toBeInTheDocument(); // Assuming the results component renders this
    expect(screen.getByText("Effective Rate: 10.00%")).toBeInTheDocument(); // Based on the mock
  });
});
