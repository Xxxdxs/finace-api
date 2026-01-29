import { IndicatorConfig } from '../types';

export const indicators: IndicatorConfig[] = [
  {
    id: 'nasdaq',
    type: 'stock',
    source: 'yahoo', 
    symbol: '^IXIC',
    displayName: 'NASDAQ'
  },
  {
    id: 'sp500',
    type: 'stock',
    source: 'yahoo',
    symbol: '^GSPC',
    displayName: 'S&P 500'
  },
  {
    id: 'btc',
    type: 'crypto',
    source: 'yahoo',
    symbol: 'BTC-USD',
    displayName: 'Bitcoin'
  },
  {
    id: 'gold',
    type: 'generic', // commodities often fit generic or we can add a new type
    source: 'yahoo',
    symbol: 'GC=F',
    displayName: 'Gold'
  },
  {
    id: 'cn_bond_10y',
    type: 'generic',
    source: 'eastmoney',
    symbol: 'cn_10y',
    displayName: 'CN 10Y Bond'
  },
  {
    id: 'cn_deposit_rate_demand',
    type: 'generic',
    source: 'eastmoney',
    symbol: 'demand_rate',
    displayName: 'CN Demand Rate'
  },
  {
    id: 'cn_deposit_rate_time_1y',
    type: 'generic',
    source: 'eastmoney',
    symbol: 'time_rate_1y',
    displayName: 'CN 1Y Rate'
  }
];
