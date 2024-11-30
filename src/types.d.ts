export interface TaxBracket {
  min: number;
  max: number;
  rate: number;
}

export interface TaxBracketWithTaxes extends TaxBracket {
  taxes: number;
}
