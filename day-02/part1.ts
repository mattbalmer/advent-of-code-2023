import { Execute } from './format';
import { Color, maxSets } from './shared';
import { sum } from '@utils/array';

const CONSTRAINT: Record<Color, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

export const execute: Execute = (games) => {
  const possibleGames = games.filter((game) => {
    const maxSeen = maxSets(game.sets);
    return [...maxSeen.entries()].every(([color, amount]) => amount <= CONSTRAINT[color]);
  });

  return sum(
    possibleGames.map((game) => game.id),
  );
}