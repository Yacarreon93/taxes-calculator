import { describe, it, expect } from "vitest";
import { formatToDollars } from "./format";

describe("formatToDollars", () => {
  it("should format a positive number as US dollars", () => {
    const amount = 1234.56;
    const result = formatToDollars(amount);
    expect(result).toBe("$1,234.56");
  });

  it("should format a negative number as US dollars", () => {
    const amount = -1234.56;
    const result = formatToDollars(amount);
    expect(result).toBe("-$1,234.56");
  });

  it("should format zero as US dollars", () => {
    const amount = 0;
    const result = formatToDollars(amount);
    expect(result).toBe("$0.00");
  });

  it("should format a large number as US dollars", () => {
    const amount = 1234567890.12;
    const result = formatToDollars(amount);
    expect(result).toBe("$1,234,567,890.12");
  });
});
