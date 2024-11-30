export interface LiveActivity {
  id: string;
  username: string;
  avatar: string;
  action: 'bet' | 'win' | 'loss';
  amount: number;
  coinSymbol: string;
  direction: 'up' | 'down';
  timestamp: Date;
  multiplier?: number;
}

const DEGENERATE_USERNAMES = [
  'MoonboiMAX',
  'DiamondHandsDave',
  'YOLOQueen',
  'RektWarrior',
  'APEish',
  'LaserEyesLarry',
  'WenLambo',
  'FOMOFighter',
  'DumpItDan',
  'BullishBrain',
  'CryptoKaren',
  'PepeTrader420',
  'DogeWhisperer',
  'SafeMoonSally',
  'RamenNoodleTrader',
  'WallStreetBet',
  'ToTheMoonTom',
  'BuyHighSellLow',
  'NFTNinja',
  'GasFeeGary'
];

const AVATAR_URLS = [
  'https://images.unsplash.com/photo-1520295187453-cd239786490c?w=100&q=80', // Ape
  'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&q=80', // Doge
  'https://images.unsplash.com/photo-1583864697784-a0efc8379f70?w=100&q=80', // Moon
  'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=100&q=80', // Crypto
  'https://images.unsplash.com/photo-1528143358888-6d3c7f67bd5d?w=100&q=80', // Rocket
  'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?w=100&q=80', // Bull
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=100&q=80', // Gradient
  'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=100&q=80', // NFT
  'https://images.unsplash.com/photo-1621504450181-5d356f61d307?w=100&q=80', // Diamond
  'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=100&q=80'  // Laser eyes
];

// Generate random activity
export const generateMockActivity = (): LiveActivity => {
  const username = DEGENERATE_USERNAMES[Math.floor(Math.random() * DEGENERATE_USERNAMES.length)];
  const avatar = AVATAR_URLS[Math.floor(Math.random() * AVATAR_URLS.length)];
  const action = Math.random() > 0.7 ? (Math.random() > 0.5 ? 'win' : 'loss') : 'bet';
  const amount = Math.floor(Math.random() * 10000) + 100;
  const direction = Math.random() > 0.5 ? 'up' : 'down';
  const multiplier = action !== 'bet' ? (1 + Math.random() * 2) : undefined;

  return {
    id: `activity-${Date.now()}-${Math.random()}`,
    username,
    avatar,
    action,
    amount,
    coinSymbol: ['DOGE', 'PEPE', 'WOJAK', 'MOON', 'APE'][Math.floor(Math.random() * 5)],
    direction,
    timestamp: new Date(),
    multiplier
  };
};

// Generate initial activities
export const generateInitialActivities = (count: number = 10): LiveActivity[] => {
  return Array.from({ length: count }, () => {
    const activity = generateMockActivity();
    // Randomize timestamp within last hour
    activity.timestamp = new Date(Date.now() - Math.random() * 3600000);
    return activity;
  }).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}; 