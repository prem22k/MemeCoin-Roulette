import axios from 'axios';
import { handleApiError } from '../utils/errorUtils.js';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export const getTrendingCoins = async () => {
  try {
    const response = await axios.get(`${COINGECKO_API}/search/trending`);
    return response.data.coins.map(coin => ({
      id: coin.item.id,
      name: coin.item.name,
      symbol: coin.item.symbol.toUpperCase(),
      price_btc: coin.item.price_btc,
      thumb: coin.item.thumb,
      score: coin.item.score || Math.random() * 10 // Fallback for testing
    }));
  } catch (error) {
    throw handleApiError(error);
  }
};