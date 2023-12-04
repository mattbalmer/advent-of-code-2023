import { toInt } from '@utils/numbers';

export type Card = {
  id: number,
  winning: Set<number>,
  given: Set<number>,
}

export const lineToCard = (line: string) => {
  const [heading, numbers] = line
    .replace(/\s+/g, ' ')
    .split(': ');
  const id = toInt(heading.split(' ')[1]);
  const [winning, given] = numbers.split(' | ').map(list => {
    return new Set(
      list
        .split(' ')
        .map(toInt)
    );
  });
  return {
    id,
    winning,
    given,
  }
}