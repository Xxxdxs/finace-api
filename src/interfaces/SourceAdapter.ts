import { StandardDataPoint, IndicatorConfig } from '../types';

export interface SourceAdapter {
  sourceName: string;
  fetch(config: IndicatorConfig): Promise<StandardDataPoint>;
}
