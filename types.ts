export enum AssetCategory {
  Crypto = 'Crypto',
  Stocks = 'Stocks',
  Forex = 'Forex',
  Indices = 'Indices',
}

export interface Asset {
  symbol: string;
  name: string;
  price: number;
  change: number;
  category: AssetCategory;
}

export enum AlertCondition {
  Above = 'Above',
  Below = 'Below',
}

export interface Alert {
  id: string;
  asset: Asset;
  condition: AlertCondition;
  targetPrice: number;
}

export enum NotificationSound {
    Default = 'Default',
    Chime = 'Chime',
    Alert = 'Alert',
    Signal = 'Signal',
}

export enum DataTimeRange {
    OneDay = '24h',
    SevenDays = '7d',
    OneMonth = '1m',
    OneYear = '1y',
}

export interface UserPreferences {
    defaultCategory: AssetCategory;
    notificationSound: NotificationSound;
    dataTimeRange: DataTimeRange;
}

export interface User {
    id: string;
    name: string;
    email: string;
    preferences: UserPreferences;
}