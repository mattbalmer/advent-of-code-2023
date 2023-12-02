import { toInt } from '@utils/numbers';

export type Color = 'red' | 'green' | 'blue';

export type Game = {
  id: number,
  sets: Record<Color, number>[]
}

export const lineToGame = (line: string): Game => {
  const [header, reveals] = line.split(': ');
  const id = toInt(header.split(' ')[1]);
  const sets = reveals.split('; ').map((setStr) => {
    return setStr.split(', ').reduce((acc, colorStr) => {
      const [count, color] = colorStr.split(' ');
      return {
        ...acc,
        [color]: toInt(count),
      }
    }, {} as Record<Color, number>);
  });

  return {
    id,
    sets,
  };
}

export const maxSets = (sets: Record<Color, number>[]): Record<Color, number> => {
  return sets.reduce((acc, set) => {
    return {
      red: Math.max(acc.red, set.red || 0),
      green: Math.max(acc.green, set.green || 0),
      blue: Math.max(acc.blue, set.blue || 0),
    }
  }, {
    red: 0,
    green: 0,
    blue: 0,
  });
}