import { Execute } from './format';
import { memoize } from '@utils/fn';

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

  let nodes = Object.keys(map).filter(key => key[2] === 'A');
  console.log('starting nodes', nodes);
  let steps = 0;
  let si = 0;
  let zCount = 0;

  while (zCount < nodes.length) {
    const char = SEQUENCE[si++ % SEQUENCE.length];
    console.log('nodes', si, char, zCount, nodes.join(', '));
    const i = CHAR_INDEX.indexOf(char);
    nodes = nodes.map(node => map[node][i]);
    steps++;
    zCount = nodes.filter(node => node[2] === 'Z').length;
  }

  return steps;
}