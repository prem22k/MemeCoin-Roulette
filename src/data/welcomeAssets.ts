import chillGuyImage from '../assets/memes/chill-guy-meme8.jpg';
import letsGoGamblingGif from '../assets/memes/lets-go-gambling.gif';
import loserCatGif from '../assets/memes/loser-cat-with-a-gambling-addiction.gif';
import chillGuyAudio from '../assets/audio/chill-guy.mp3';
import letsGoGamblingAudio from '../assets/audio/lets-go-gambling (mp3cut.net).mp3';
import loserCatAudio from '../assets/audio/loser-cat-with-a-gambling-addiction.mp3';

export interface MemeAsset {
  image: string;
  audio: string;
  title: string;
  alt: string;
}

export const memeAssets: MemeAsset[] = [
  {
    image: chillGuyImage,
    audio: chillGuyAudio,
    title: 'Chill Guy',
    alt: 'Chill guy meme'
  },
  {
    image: letsGoGamblingGif,
    audio: letsGoGamblingAudio,
    title: 'Let\'s Go Gambling',
    alt: 'Gambling excitement gif'
  },
  {
    image: loserCatGif,
    audio: loserCatAudio,
    title: 'Gambling Cat',
    alt: 'Cat with gambling addiction meme'
  }
];

export const getRandomMemeAsset = (): MemeAsset => {
  return memeAssets[Math.floor(Math.random() * memeAssets.length)];
}; 