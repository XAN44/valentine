export enum AppScene {
  INTRO = 'INTRO',
  TIMELINE = 'TIMELINE',
  GAME = 'GAME',
  LETTER = 'LETTER',
}

export interface Memory {
  id: number;
  date: string;
  title: string;
  description: string;
  image: string;
}

export interface GameItem {
  id: number;
  x: number;
  y: number;
  type: 'heart' | 'gem' | 'bomb';
  speed: number;
}
