import { Bet } from '../../types';

const userAvatars = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1569913486515-b74bf7751574?w=100&h=100&fit=crop',
];

const coinSymbols = ['DOGE', 'PEPE', 'SHIB', 'FLOKI', 'WOJAK', 'BONK', 'MEME'];
const usernames = [
  'DiamondHands',
  'MoonBoi',
  'Degenerate',
  'RektHunter',
  'WenLambo',
  'VitalikFan',
  'ShibArmy',
  'DogeKing',
  'PepeLord',
];

const generateRandomAmount = () => {
  const bases = [100, 1000, 10000, 100000];
  const base = bases[Math.floor(Math.random() * bases.length)];
  return base * (1 + Math.random());
};

export const generateMockBet = (): Bet => ({
  id: Math.random().toString(36).substr(2, 9),
  userId: Math.random().toString(36).substr(2, 9),
  username: usernames[Math.floor(Math.random() * usernames.length)],
  coinSymbol: coinSymbols[Math.floor(Math.random() * coinSymbols.length)],
  amount: generateRandomAmount(),
  prediction: Math.random() > 0.5 ? 'up' : 'down',
  timestamp: new Date(),
  userAvatar: userAvatars[Math.floor(Math.random() * userAvatars.length)],
});

export const generateInitialBets = (count: number): Bet[] => {
  return Array(count)
    .fill(null)
    .map(() => {
      const bet = generateMockBet();
      // Set timestamp to a random time in the past few minutes
      bet.timestamp = new Date(Date.now() - Math.random() * 300000); // Past 5 minutes
      return bet;
    })
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};