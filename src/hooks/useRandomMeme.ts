import { useState, useCallback } from 'react';
import { memes } from '../data/memes';
import { Meme } from '../types';

export const useRandomMeme = () => {
  const [currentMeme, setCurrentMeme] = useState<Meme | null>(() => {
    const randomIndex = Math.floor(Math.random() * memes.length);
    return memes[randomIndex];
  });

  const refreshMeme = useCallback(() => {
    let newIndex: number;
    do {
      newIndex = Math.floor(Math.random() * memes.length);
    } while (memes[newIndex].id === currentMeme?.id && memes.length > 1);
    
    setCurrentMeme(memes[newIndex]);
  }, [currentMeme]);

  return {
    currentMeme,
    refreshMeme
  };
};