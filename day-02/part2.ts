import { Execute } from './format';
import { Game, maxSets } from './shared';
import { mult, sum } from '@utils/array';

const powerOfGame = (game: Game): number => {
  const maxSeen = maxSets(game.sets);
  return mult([...maxSeen.values()]);
}

export const execute: Execute = (games) => {
  return sum(
    games.map(powerOfGame),
  )
}