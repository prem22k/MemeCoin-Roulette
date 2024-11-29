import express from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { oddsService } from '../services/oddsService.js';
import { getTrendingCoins } from '../services/trendsService.js';

export const oddsRouter = express.Router();

oddsRouter.get('/', asyncHandler(async (req, res) => {
  const trendingCoins = await getTrendingCoins();
  const oddsData = oddsService.calculateBatchOdds(trendingCoins);
  
  res.json({
    success: true,
    data: oddsData
  });
}));

oddsRouter.get('/:coinId', asyncHandler(async (req, res) => {
  const { coinId } = req.params;
  const trendingCoins = await getTrendingCoins();
  const coin = trendingCoins.find(c => c.id === coinId);
  
  if (!coin) {
    return res.status(404).json({
      success: false,
      error: 'Coin not found'
    });
  }
  
  const oddsData = oddsService.calculateOdds(coin);
  
  res.json({
    success: true,
    data: oddsData
  });
}));