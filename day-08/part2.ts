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

  const nextNode = memoize((node) => {
    let result = node;
    SEQUENCE.forEach(char => {
      const i = CHAR_INDEX.indexOf(char);
      result = map[result][i];
    });
    return result;
  });

  let nodes = Object.keys(map).filter(key => key[2] === 'A');
  console.log('starting nodes', nodes);
  let steps = 0;

  let states = [];

  while (nodes.some(node => node[2] !== 'Z')) {
    let state = nodes.join(',');
    if (states.indexOf(state) < 0) {
      states.push(state);
      console.log(state);
    } else {
      console.log('loop detected', nodes, states);
      break;
    }
    nodes = nodes.map((node) => nextNode(node));
    steps += SEQUENCE.length;
  }

  return steps;
}