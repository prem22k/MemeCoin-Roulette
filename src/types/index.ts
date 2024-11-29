// User related types
export interface User {
  id: string;
  username: string;
  avatar: string;
  points: number;
  totalBets: number;
  winRate: number;
  streak: number;
  createdAt: Date;
}

// Coin/Meme related types
export interface Coin {
  id: string;
  name: string;
  symbol: string;
  thumbnail: string;
  price: number;
  mentions: number;
  odds: number;
  potentialMultiplier: number;
  trend: 'up' | 'down' | 'neutral';
  volume24h: number;
  marketCap: number;
  lastUpdated: Date;
}

// Bet related types
export type BetDirection = 'up' | 'down';
export type BetStatus = 'pending' | 'won' | 'lost';

export interface BetData {
  coinId: string;
  amount: number;
  direction: BetDirection;
  odds: number;
}

export interface UserBet extends BetData {
  id: string;
  userId: string;
  status: BetStatus;
  timestamp: Date;
  coinSymbol: string;
  coinThumbnail: string;
  potentialReturn: number;
}

export interface Bet {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  coinSymbol: string;
  amount: number;
  prediction: BetDirection;
  timestamp: Date;
}

// Leaderboard related types
export interface LeaderboardEntry {
  id: string;
  rank: number;
  username: string;
  avatar: string;
  points: number;
  totalBets: number;
  winRate: number;
  streak: number;
}

// Meme related types
export interface Meme {
  id: string;
  name: string;
  description?: string;
  image: string;
  sound?: string;
  category: string;
  tags: string[];
  popularity: number;
  createdAt: Date;
}

// Chart related types
export interface ChartData {
  timestamp: Date;
  value: number;
  change: number;
}

export interface ChartPoint {
  x: number;
  y: number;
  data: Coin;
}

// Theme related types
export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemeColor = 'purple' | 'blue' | 'green' | 'red' | 'yellow';

// Notification related types
export type NotificationVariant = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
  id: string;
  type: NotificationVariant;
  message: string;
  duration?: number;
  data?: unknown;
}

// Form related types
export interface ValidationRule {
  validate: (value: any) => boolean;
  message: string;
}

export interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  rules?: ValidationRule[];
  defaultValue?: any;
}

// API related types
export interface ApiError {
  code: string;
  message: string;
  status: number;
  details?: unknown;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  page: number;
  totalPages: number;
  totalItems: number;
}

// Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Nullable<T> = T | null;

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export type SortDirection = 'asc' | 'desc';

export type SortField = 'timestamp' | 'amount' | 'odds' | 'points' | 'winRate';