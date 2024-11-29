import { useQuery } from '@tanstack/react-query';
import { giphyService, GiphyData } from '../services/giphyService';
import { GiphyError } from '../utils/errorHandling';
import { Coin } from '../types';

const STALE_TIME = 1000 * 30; // 30 seconds
const TRENDING_MEMES_KEY = 'trending-memes';

interface UseGiphyTrendsOptions {
  enabled?: boolean;
  refetchInterval?: number | false;
  timeRange?: '1h' | '24h' | '7d' | '30d';
}

export const useGiphyTrends = (options: UseGiphyTrendsOptions = {}) => {
  const { enabled = true, refetchInterval = false, timeRange = '24h' } = options;

  // Convert Giphy data to Coin format
  const convertToCoins = (giphyMemes: GiphyData[]): Coin[] => {
    return giphyMemes.map(meme => ({
      id: meme.id,
      name: meme.title,
      symbol: meme.title.slice(0, 4).toUpperCase(),
      thumbnail: meme.images.fixed_height.url,
      price: Math.random() * 100,
      mentions: Math.floor(Math.random() * 1000),
      odds: 1 + Math.random(),
      potentialMultiplier: 1 + Math.random() * 2,
      trend: Math.random() > 0.5 ? 'up' : 'down',
      volume24h: Math.floor(Math.random() * 1000000),
      marketCap: Math.floor(Math.random() * 10000000),
      lastUpdated: new Date()
    }));
  };

  // Main query hook
  const query = useQuery<Coin[], GiphyError>({
    queryKey: [TRENDING_MEMES_KEY, timeRange],
    queryFn: async () => {
      try {
        const data = await giphyService.getTrendingMemes();
        return convertToCoins(data);
      } catch (error) {
        if (error instanceof GiphyError) {
          throw error;
        }
        throw new GiphyError('Unknown error occurred while fetching memes', 'UNKNOWN_ERROR');
      }
    },
    enabled,
    refetchInterval,
    staleTime: STALE_TIME,
    gcTime: STALE_TIME * 2,
    retry: (failureCount, error) => {
      if (error instanceof GiphyError && error.code === 'RATE_LIMIT') {
        return false;
      }
      return failureCount < 3;
    }
  });

  return {
    memes: query.data ?? [],
    loading: query.isLoading,
    error: query.error,
    isRefetching: query.isRefetching,
    refreshMemes: () => query.refetch()
  };
}; 