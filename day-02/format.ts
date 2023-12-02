import { Game, lineToGame } from './shared';

export type Execute = (lines: Game[]) => number;

export const format = (raw: string): Parameters<Execute> => {
  return [
    raw.split('\n').filter(Boolean).map(lineToGame),
  ];
}