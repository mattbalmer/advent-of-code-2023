import { inputToRaces, Race } from './shared';

export type Execute = (races: Race[]) => number;

export const format = (raw: string): Parameters<Execute> => {
  return [
    inputToRaces(raw.split('\n').filter(Boolean) as [string, string])
  ];
}