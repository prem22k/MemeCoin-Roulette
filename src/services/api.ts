import axios, { AxiosError } from 'axios';
import { AppError } from '../utils/errorHandling';
import { LeaderboardEntry, UserBet, BetData, Coin } from '../types';

interface GiphyResponse {
  data: {
    id: string;
    title: string;
    images: {
      original: { url: string };
      fixed_height: { url: string };
    };
    trending_datetime: string;
  }[];
}

interface ApiErrorResponse {
  message?: string;
  error?: string;
}

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Error messages for different scenarios
const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Unable to connect to the server. Please check your internet connection.',
  RATE_LIMIT: 'Too many requests. Please try again later.',
  API_KEY: 'Invalid API key. Please check your configuration.',
  TIMEOUT: 'Request timed out. Please try again.',
  DEFAULT: 'An unexpected error occurred. Please try again later.'
};

// Handle API errors
const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    
    // Network errors
    if (!axiosError.response) {
      throw new AppError(ERROR_MESSAGES.NETWORK_ERROR, 'NETWORK_ERROR', 503);
    }

    // Handle specific status codes
    switch (axiosError.response.status) {
      case 401:
        throw new AppError(ERROR_MESSAGES.API_KEY, 'INVALID_API_KEY', 401);
      case 429:
        throw new AppError(ERROR_MESSAGES.RATE_LIMIT, 'RATE_LIMIT', 429);
      case 408:
        throw new AppError(ERROR_MESSAGES.TIMEOUT, 'TIMEOUT', 408);
      default:
        throw new AppError(
          axiosError.response.data?.message || ERROR_MESSAGES.DEFAULT,
          'API_ERROR',
          axiosError.response.status
        );
    }
  }

  // Handle non-Axios errors
  throw new AppError(ERROR_MESSAGES.DEFAULT, 'UNKNOWN_ERROR', 500);
};

// Enhanced Giphy API service
export const giphyApi = {
  getTrending: async (limit: number = 20) => {
    try {
      const response = await axios.get<GiphyResponse>('https://api.giphy.com/v1/gifs/trending', {
        params: {
          api_key: import.meta.env.VITE_GIPHY_API_KEY,
          limit,
          rating: 'g'
        }
      });

      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
};

// Game API services
export const getTrends = async () => {
  try {
    const response = await api.get<Coin[]>('/trends');
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getOdds = async () => {
  try {
    const response = await api.get<Coin[]>('/odds');
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const placeBet = async (betData: BetData) => {
  try {
    const response = await api.post<{ success: boolean }>('/bets', betData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getUserBets = async (userId?: number) => {
  try {
    // If no userId is provided, get current user's bets
    const endpoint = userId ? `/users/${userId}/bets` : '/bets/me';
    const response = await api.get<{ bets: UserBet[] }>(endpoint);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getLeaderboard = async (timeframe: string) => {
  try {
    const response = await api.get<LeaderboardEntry[]>('/leaderboard', {
      params: { timeframe }
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Retry mechanism for failed requests
export const withRetry = async <T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    
    await new Promise(resolve => setTimeout(resolve, delay));
    return withRetry(fn, retries - 1, delay * 2);
  }
};