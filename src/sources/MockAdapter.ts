import { SourceAdapter } from '../interfaces/SourceAdapter';
import { IndicatorConfig, StandardDataPoint } from '../types';

export class MockAdapter implements SourceAdapter {
  sourceName = 'mock';

  async fetch(config: IndicatorConfig): Promise<StandardDataPoint> {
    const baseValue = 100 + Math.random() * 50;
    const change = (Math.random() - 0.5) * 5;
    
    return {
      label: config.displayName,
      value: baseValue.toFixed(2),
      unit: 'USD',
      change: change,
      changePercent: (change / baseValue) * 100,
      timestamp: new Date()
    };
  }
}
