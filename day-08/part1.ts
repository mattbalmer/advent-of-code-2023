import { Execute } from './format';

type Node = 'string';
type Connections = [left: Node, right: Node];

const CHAR_INDEX = 'LR';

export const execute: Execute = (lines) => {
  const SEQUENCE = lines[0].split('');

  const map = lines.slice(2).reduce((map, line) => {
    const [id, connections] = line.split(' = ');
    const [left, right] = connections.split(', ');
    return {
      ...map,
      [id]: [left.substring(1), right.substring(0, right.length - 1)]
    }
  }, {} as Record<Node, Connections>);

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