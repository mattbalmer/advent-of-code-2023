import { Execute } from './format';
import { toInt } from '@utils/numbers';

type Type = string;
type Range = [from: number, range: number, to: number];
type Chunk = {
  input: Type,
  output: Type,
  ranges: Range[],
}
type Chunks = Record<Type, Chunk>;

const toChunks = (linesList: string[][]): Chunks => {
  const chunks: Chunk[] = linesList.map(([first, ...lines]) => {
    const [, input, output] = first.match(/([a-z]+)-to-([a-z]+)/g);
    const ranges = lines.map(line => {
      const [to, from, range] = line.split(' ').map(toInt);
      return [from, range, to] as Range;
    });
    return {
      input,
      output,
      ranges,
    };
  });

  return chunks.reduce((chunks, chunk) => {
    chunks[chunk.input] = chunk;
    return chunks;
  }, {});
}

const traverseMaps = (number: number, chunks: Chunks, input: Type = 'seed'): number => {
  const chunk = chunks[input];

  if (chunk) {
    return traverseMaps(
      chunk[]
    );
  } else {
    return number;
  }
}

export const execute: Execute = (sections) => {
  const seeds = sections[0].split(' ').slice(1).map(toInt);
  const chunks = toChunks(
    sections.slice(1).map(section => section.split('\n'))
  );

  return Math.min(
    ...seeds.map(seed => traverseMaps(seed, chunks))
  )
}