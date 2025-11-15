
import { Asset, AssetCategory } from './types';

export const ASSETS: Record<AssetCategory, Asset[]> = {
  [AssetCategory.Crypto]: [
    { symbol: 'BTC', name: 'Bitcoin', price: 68123.45, change: 2.5, category: AssetCategory.Crypto },
    { symbol: 'ETH', name: 'Ethereum', price: 3543.21, change: -1.2, category: AssetCategory.Crypto },
    { symbol: 'SOL', name: 'Solana', price: 165.78, change: 5.8, category: AssetCategory.Crypto },
    { symbol: 'DOGE', name: 'Dogecoin', price: 0.15, change: 0.5, category: AssetCategory.Crypto },
  ],
  [AssetCategory.Stocks]: [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 214.29, change: 1.9, category: AssetCategory.Stocks },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 176.45, change: -0.8, category: AssetCategory.Stocks },
    { symbol: 'TSLA', name: 'Tesla, Inc.', price: 184.88, change: 3.2, category: AssetCategory.Stocks },
    { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 185.57, change: -0.1, category: AssetCategory.Stocks },
  ],
  [AssetCategory.Forex]: [
    { symbol: 'EUR/USD', name: 'Euro/US Dollar', price: 1.0712, change: 0.2, category: AssetCategory.Forex },
    { symbol: 'GBP/JPY', name: 'Pound/Yen', price: 200.54, change: -0.5, category: AssetCategory.Forex },
    { symbol: 'USD/CAD', name: 'US Dollar/Canadian Dollar', price: 1.3721, change: 0.1, category: AssetCategory.Forex },
  ],
  [AssetCategory.Indices]: [
    { symbol: 'SPX', name: 'S&P 500', price: 5433.74, change: 0.25, category: AssetCategory.Indices },
    { symbol: 'NDQ', name: 'Nasdaq 100', price: 19465.18, change: 0.34, category: AssetCategory.Indices },
    { symbol: 'DJI', name: 'Dow Jones Industrial', price: 38589.16, change: -0.15, category: AssetCategory.Indices },
  ],
};
