import express from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { betService } from '../services/betService.js';

export const betsRouter = express.Router();

// Create a new bet
betsRouter.post('/', asyncHandler(async (req, res) => {
  // TODO: Replace with actual user authentication
  const mockUserId = 'user-123';
  
  const bet = betService.createBet(mockUserId, req.body);
  
  res.status(201).json({
    success: true,
    data: bet
  });
}));

// Get user's bets
betsRouter.get('/user', asyncHandler(async (req, res) => {
  // TODO: Replace with actual user authentication
  const mockUserId = 'user-123';
  
  const bets = betService.getUserBets(mockUserId);
  
  res.json({
    success: true,
    data: bets
  });
}));

// Get recent bets for live feed
betsRouter.get('/recent', asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const bets = betService.getRecentBets(limit);
  
  res.json({
    success: true,
    data: bets
  });
}));

// Get specific bet
betsRouter.get('/:betId', asyncHandler(async (req, res) => {
  const bet = betService.getBet(req.params.betId);
  
  res.json({
    success: true,
    data: bet
  });
}));