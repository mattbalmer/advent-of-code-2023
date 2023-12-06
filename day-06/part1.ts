import { Execute } from './format';
import { mult } from '@utils/array';
import { numWaysToWinRace, Race } from './shared';
import { toInt } from '@utils/numbers';

const inputToRaces = (lines: [string, string]): Race[] => {
  const [times, distances] = lines
    .map((line) =>
      line.split(':')[1]
        .replace(/\s+/g, ' ')
        .split(' ')
        .filter(Boolean)
        .map(toInt)
    );

  return distances.map((distance, i) => ({
    distance,
    time: times[i],
  }));
}

export const execute: Execute = (lines) => {
  const races = inputToRaces(lines);
  return mult(
    races.map(numWaysToWinRace)
  )
}