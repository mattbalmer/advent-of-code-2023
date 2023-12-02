import { toInt } from '@utils/numbers';
import { MaxMap } from '@utils/map';

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

export const maxSets = (sets: Record<Color, number>[]): MaxMap<Color> => {
  return sets.reduce((acc, set) => {
    return acc.setAll(set);
  }, new MaxMap<Color>());
}