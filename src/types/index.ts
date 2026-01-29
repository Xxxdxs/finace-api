export interface StandardDataPoint {
  label: string;
  value: number | string;
  unit?: string;
  change?: number; // Absolute change
  changePercent?: number; // Percentage
  timestamp: Date;
  meta?: any; // Extra info
}

export type IndicatorType = 'stock' | 'crypto' | 'currency' | 'generic';

export interface IndicatorConfig {
  id: string;
  type: IndicatorType;
  source: string; // 'yahoo', 'mock', etc.
  symbol: string; // The identifier passed to the source
  displayName: string;
  params?: any; // Extra params for specific sources
}
