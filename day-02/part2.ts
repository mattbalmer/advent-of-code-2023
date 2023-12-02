import { Execute } from './format';
import { Game, lineToGame, maxSets } from './shared';
import { mult, sum } from '@utils/array';

const powerOfGame = (game: Game): number => {
  const maxSeen = maxSets(game.sets);
  return mult(Object.values(maxSeen));
}

export const execute: Execute = (lines) => {
  const games = lines.map(lineToGame);

  return sum(
    games.map(powerOfGame),
  )
}