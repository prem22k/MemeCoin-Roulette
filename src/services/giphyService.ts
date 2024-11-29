import axios, { AxiosError } from 'axios';
import { GiphyError } from '../utils/errorHandling';

// API Configuration
const GIPHY_CONFIG = {
  apiKey: '3PpRAIvciGwKb60PDobMPi5DK8D9kVSZ',
  baseURL: 'https://api.giphy.com/v1/gifs',
  defaultParams: {
    rating: 'g',
    lang: 'en'
  }
};

interface GiphyImage {
  url: string;
  width: string;
  height: string;
}

interface GiphyImages {
  original: GiphyImage;
  fixed_height: GiphyImage;
  preview_gif: GiphyImage;
}

interface GiphyData {
  id: string;
  title: string;
  images: GiphyImages;
  trending_datetime: string;
}

interface GiphyResponse {
  data: GiphyData[];
  meta: {
    status: number;
    msg: string;
    response_id: string;
  };
  pagination: {
    total_count: number;
    count: number;
    offset: number;
  };
}

class GiphyService {
  private readonly api;

  constructor() {
    this.api = axios.create({
      baseURL: GIPHY_CONFIG.baseURL,
      params: {
        api_key: GIPHY_CONFIG.apiKey,
        ...GIPHY_CONFIG.defaultParams
      }
    });

    // Add request interceptor for logging
    this.api.interceptors.request.use(config => {
      console.log('Making request to Giphy API:', {
        url: config.url,
        params: config.params
      });
      return config;
    });

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      response => {
        console.log('Successful API response:', {
          endpoint: response.config.url,
          status: response.status,
          dataCount: response.data.data?.length
        });
        return response;
      },
      this.handleApiError
    );
  }

  private handleApiError(error: unknown): never {
    console.error('API Error:', error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string }>;
      
      if (!axiosError.response) {
        throw new GiphyError('Network error - please check your connection', 'NETWORK_ERROR');
      }

      switch (axiosError.response.status) {
        case 401:
          throw new GiphyError(
            'Invalid API key - please check your configuration',
            'INVALID_API_KEY'
          );
        case 429:
          throw new GiphyError(
            'Rate limit exceeded - please try again later',
            'RATE_LIMIT'
          );
        default:
          throw new GiphyError(
            axiosError.response.data?.message || 'Unknown API error',
            'API_ERROR'
          );
      }
    }

    throw new GiphyError('Unknown error occurred', 'UNKNOWN_ERROR');
  }

  async getTrendingMemes(limit: number = 10): Promise<GiphyData[]> {
    try {
      const response = await this.api.get<GiphyResponse>('/trending', {
        params: { limit }
      });

      // Validate response structure
      if (!response.data.data || !Array.isArray(response.data.data)) {
        throw new GiphyError(
          'Invalid response format from Giphy API',
          'API_ERROR'
        );
      }

      return response.data.data;
    } catch (error) {
      console.error('Error fetching trending memes:', error);
      throw error;
    }
  }

  async searchMemes(query: string, limit: number = 10): Promise<GiphyData[]> {
    const response = await this.api.get<GiphyResponse>('/search', {
      params: { q: query, limit }
    });
    return response.data.data;
  }
}

// Export singleton instance
export const giphyService = new GiphyService();
export type { GiphyData, GiphyResponse };