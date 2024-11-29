import { Meme } from '../types';

export const memes: Meme[] = [
  {
    id: '1',
    name: 'Much Wow!',
    image: 'https://images.unsplash.com/photo-1581375074612-d1fd0e661aeb?auto=format&fit=crop&w=800&q=80',
    sound: '/sounds/wow-doge.mp3',
    description: 'Very crypto, such gains!',
    category: 'crypto',
    tags: ['doge', 'cryptocurrency', 'wow'],
    popularity: 1000,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'Rare Pepe',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=800&q=80',
    sound: '/sounds/pepe-laugh.mp3',
    description: 'Feeling lucky today!',
    category: 'classic',
    tags: ['pepe', 'rare', 'frog'],
    popularity: 850,
    createdAt: new Date('2024-01-02')
  },
  {
    id: '3',
    name: 'Diamond Hands',
    image: 'https://images.unsplash.com/photo-1624996379697-f01d168b1a52?auto=format&fit=crop&w=800&q=80',
    sound: '/sounds/wojak-panic.mp3',
    description: 'HODL till the moon!',
    category: 'crypto',
    tags: ['hodl', 'diamond', 'hands', 'wsb'],
    popularity: 1200,
    createdAt: new Date('2024-01-03')
  }
];