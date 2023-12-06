import { Execute } from './format';
import { mult } from '@utils/array';
import { Race } from './shared';
import { memoize } from '@utils/fn';

const slope = memoize((y: number, n: number): number => (y / n) + n);

const doesWinRace = (target: number, time: number, release: number): boolean => {
  const x = slope(target, release);
  return x < time;
}

const numWaysToWinRace = (race: Race): number => {
  let lowerBound;
  let upperBound;

  // set lowerBound
  for (let i = 1; i < race.time; i++) {
    const solves = doesWinRace(race.distance, race.time, i);
    if (solves) {
      lowerBound = i;
      break;
    }
  }

  if (!lowerBound) {
    return 0;
  }

  // set upperBound
  for (let i = race.time - 1; i > lowerBound; i--) {
    const solves = doesWinRace(race.distance, race.time, i);
    if (solves) {
      upperBound = i;
      break;
    }
  }

  return upperBound - lowerBound + 1;
}

export const execute: Execute = (races) => {
  return mult(
    races.map(numWaysToWinRace)
  )
}