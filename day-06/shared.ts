import { toInt } from '@utils/numbers';

export type Race = {
  distance: number;
  time: number;
}

export const slope = (y: number, n: number): number => (y / n) + n;

export const doesWinRace = (target: number, time: number, release: number): boolean => {
  const x = slope(target, release);
  return x < time;
}

export const numWaysToWinRace = (race: Race): number => {
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