import { Execute } from './format';
import { numWaysToWinRace, Race } from './shared';
import { toInt } from '@utils/numbers';

const inputToRace = (lines: [string, string]): Race => {
  const [time, distance] = lines
    .map((line) =>
      toInt(
        line.split(':')[1]
          .replace(/\s+/g, '')
          .split(' ')
          .filter(Boolean)
          [0]
      )
    );

  return {
    time,
    distance,
  }
}

export const execute: Execute = (lines) => {
  const race = inputToRace(lines);
  return numWaysToWinRace(race);
}