export interface LeaderboardEntry {
  id: string;
  username: string;
  avatar: string;
  totalWins: number;
  totalBets: number;
  winRate: number;
  points: number;
  streak: number;
  lastActive: Date;
}

// Generate mock leaderboard data
export const generateMockLeaderboard = (count: number = 50): LeaderboardEntry[] => {
  const usernames = [
    'MoonboiMAX', 'DiamondHandsDave', 'YOLOQueen', 'RektWarrior',
    'APEish', 'LaserEyesLarry', 'WenLambo', 'FOMOFighter',
    'DumpItDan', 'BullishBrain', 'CryptoKaren', 'PepeTrader420'
  ];

  return Array.from({ length: count }, (_, index) => {
    const totalBets = Math.floor(Math.random() * 1000) + 50;
    const totalWins = Math.floor(Math.random() * totalBets);
    
    return {
      id: `user-${index + 1}`,
      username: usernames[index % usernames.length] || `Player${index + 1}`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${index}`,
      totalWins,
      totalBets,
      winRate: (totalWins / totalBets) * 100,
      points: Math.floor(Math.random() * 1000000),
      streak: Math.floor(Math.random() * 15),
      lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
    };
  });
}; 