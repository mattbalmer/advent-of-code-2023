import { Execute } from './format';
import { CHAR_INDEX, parseMap } from './shared';

export const execute: Execute = (lines) => {
  const SEQUENCE = lines[0].split('');
  const map = parseMap(lines);

  let node = 'AAA';
  let steps = 0;

  while (node !== 'ZZZ') {
    SEQUENCE.forEach(char => {
      const i = CHAR_INDEX.indexOf(char);
      node = map[node][i];
      steps++;
    });
  }

  return steps;
}