import { Card, lineToCard } from './shared';

export type Execute = (cards: Card[]) => number;

export const format = (raw: string): Parameters<Execute> => {
  return [
    raw.split('\n').filter(Boolean).map(lineToCard),
  ];
}