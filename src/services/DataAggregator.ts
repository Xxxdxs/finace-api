import { IndicatorConfig, StandardDataPoint } from '../types';
import { SourceRegistry } from '../sources/SourceRegistry';

export class DataAggregator {
  constructor(private registry: SourceRegistry) {}

  async fetchAll(configs: IndicatorConfig[]): Promise<StandardDataPoint[]> {
    const promises = configs.map(async (config) => {
      const adapter = this.registry.get(config.source);
      if (!adapter) {
        console.warn(`No adapter found for source: ${config.source}`);
        return null;
      }
      try {
        return await adapter.fetch(config);
      } catch (err) {
        console.error(`Failed to fetch ${config.displayName}:`, err);
        // Return an error placeholder so the grid doesn't break
        return {
            label: config.displayName,
            value: 'ERR',
            unit: '',
            timestamp: new Date()
        } as StandardDataPoint;
      }
    });

    const results = await Promise.all(promises);
    return results.filter((r): r is StandardDataPoint => r !== null);
  }
}
