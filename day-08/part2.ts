import { Execute } from './format';
import { lcm } from '@utils/numbers';
import { CHAR_INDEX, parseMap } from './shared';

export const execute: Execute = (lines) => {
  const SEQUENCE = lines[0].split('');
  const map = parseMap(lines);

  const nodes = Object.keys(map).filter(key => key[2] === 'A');

  const factors = nodes.map(node => {
    let steps = 0;
    while (node[2] !== 'Z') {
      SEQUENCE.forEach(char => {
        const i = CHAR_INDEX.indexOf(char);
        node = map[node][i];
        steps++;
      });
    }
    return steps;
  });

  return lcm(factors);
}