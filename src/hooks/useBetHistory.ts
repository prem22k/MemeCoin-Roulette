import { useState, useEffect } from 'react';
import { Coin, BetData, BetDirection } from '../types';

interface UserBetState {
  memeId: string;
  memeName: string;
  direction: BetDirection;
  amount: number;
  odds: number;
  timestamp: Date;
  status: 'pending' | 'won' | 'lost';
}

export const useBetHistory = () => {
  const [userBets, setUserBets] = useState<UserBetState[]>(() => {
    // Load saved bets from localStorage on initialization
    const savedBets = localStorage.getItem('userBets');
    return savedBets ? JSON.parse(savedBets) : [];
  });

  // Save bets to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userBets', JSON.stringify(userBets));
  }, [userBets]);

  const addBet = (coin: Coin, betData: BetData) => {
    const newBet: UserBetState = {
      memeId: coin.id,
      memeName: coin.name,
      direction: betData.direction,
      amount: betData.amount,
      odds: betData.odds,
      timestamp: new Date(),
      status: 'pending'
    };

    setUserBets(prevBets => [newBet, ...prevBets]);
  };

  const updateBetStatus = (memeId: string, status: 'won' | 'lost') => {
    setUserBets(prevBets =>
      prevBets.map(bet =>
        bet.memeId === memeId ? { ...bet, status } : bet
      )
    );
  };

  const clearBets = () => {
    setUserBets([]);
    localStorage.removeItem('userBets');
  };

  return {
    userBets,
    addBet,
    updateBetStatus,
    clearBets
  };
}; 