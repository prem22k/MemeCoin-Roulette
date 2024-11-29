import express from 'express';
import { getTrendingCoins } from '../services/trendsService.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

export const trendsRouter = express.Router();

trendsRouter.get('/', asyncHandler(async (req, res) => {
  const trends = await getTrendingCoins();
  res.json(trends);
}));