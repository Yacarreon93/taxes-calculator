import { describe, it, expect } from "vitest";
import { getTaxesPerBracket, processTaxBrackets } from "./taxes";
import { TaxBracket } from "../types";

describe("getTaxesPerBracket", () => {
  it("should calculate tax correctly within the bracket", () => {
    const bracket: TaxBracket = { min: 10000, max: 20000, rate: 0.1 };
    const salary = 15000;
    const result = getTaxesPerBracket(bracket, salary);
    expect(result).toBe(500);
  });

  it("should calculate tax correctly at the max of the bracket", () => {
    const bracket: TaxBracket = { min: 10000, max: 20000, rate: 0.1 };
    const salary = 20000;
    const result = getTaxesPerBracket(bracket, salary);
    expect(result).toBe(1000);
  });

  it("should calculate tax correctly above the bracket", () => {
    const bracket: TaxBracket = { min: 10000, max: 20000, rate: 0.1 };
    const salary = 25000;
    const result = getTaxesPerBracket(bracket, salary);
    expect(result).toBe(1000);
  });

  it("should calculate zero tax below the bracket", () => {
    const bracket: TaxBracket = { min: 10000, max: 20000, rate: 0.1 };
    const salary = 5000;
    const result = getTaxesPerBracket(bracket, salary);
    expect(result).toBe(0);
  });
});

describe("processTaxBrackets", () => {
  it("should process tax brackets correctly", () => {
    const taxBrackets: TaxBracket[] = [
      { min: 0, max: 10000, rate: 0.1 },
      { min: 10000, max: 20000, rate: 0.2 },
      { min: 20000, max: 30000, rate: 0.3 },
    ];
    const salary = 25000;
    const result = processTaxBrackets(taxBrackets, salary);
    expect(result).toEqual([
      { min: 0, max: 10000, rate: 0.1, taxes: 1000 },
      { min: 10000, max: 20000, rate: 0.2, taxes: 2000 },
      { min: 20000, max: 30000, rate: 0.3, taxes: 1500 },
    ]);
  });

  it("should process tax brackets with zero salary", () => {
    const taxBrackets: TaxBracket[] = [
      { min: 0, max: 10000, rate: 0.1 },
      { min: 10000, max: 20000, rate: 0.2 },
      { min: 20000, max: 30000, rate: 0.3 },
    ];
    const salary = 0;
    const result = processTaxBrackets(taxBrackets, salary);
    expect(result).toEqual([
      { min: 0, max: 10000, rate: 0.1, taxes: 0 },
      { min: 10000, max: 20000, rate: 0.2, taxes: 0 },
      { min: 20000, max: 30000, rate: 0.3, taxes: 0 },
    ]);
  });
});
