import { SourceAdapter } from '../interfaces/SourceAdapter';
import { IndicatorConfig, StandardDataPoint } from '../types';

// Use require to avoid ESM/CJS interop issues with this specific library version
const YahooFinance = require('yahoo-finance2').default; 
const yahooFinance = new YahooFinance();

export class YahooFinanceAdapter implements SourceAdapter {
  sourceName = 'yahoo';

  async fetch(config: IndicatorConfig): Promise<StandardDataPoint> {
    try {
      // Suppress console warnings from library if needed, or handle appropriately
      const quote = await yahooFinance.quote(config.symbol) as any;
      
      return {
        label: config.displayName,
        value: quote.regularMarketPrice || 0,
        unit: quote.currency || 'USD',
        change: quote.regularMarketChange,
        changePercent: quote.regularMarketChangePercent,
        timestamp: quote.regularMarketTime || new Date(),
        meta: {
          shortName: quote.shortName
        }
      };
    } catch (error) {
      console.error(`Error fetching ${config.symbol} from Yahoo:`, error);
      // Return a fallback or rethrow
      throw error;
    }
  }
}
