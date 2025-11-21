export interface Dimensions {
  width: number;
  height: number;
}

export interface FormatData {
  id: string;
  name: string;
  commonName: string; // e.g., "6x7", "645"
  dimensions: Dimensions;
  description: string;
  examples: string; // Representative cameras
}

export interface CalculationResult {
  format: FormatData;
  cropFactor: number;
  equivalentFocalLength: number;
  diagonalMm: number;
  aspectRatio: number;
}
