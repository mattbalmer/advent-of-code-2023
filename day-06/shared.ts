import { toInt } from '@utils/numbers';

export type Race = {
  distance: number;
  time: number;
}

export const inputToRaces = (lines: [string, string]): Race[] => {
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
