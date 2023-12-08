import { Execute } from './format';
import { memoize } from '@utils/fn';
import { mult } from '@utils/array';

type Node = 'string';
type Connections = [left: Node, right: Node];

const CHAR_INDEX = 'LR';

function lcm(numbers) {
  function gcd(a, b) {
    // If the second argument is 0, return the first argument (base case)
    if (b === 0) {
      return a;
    }
    // Otherwise, recursively call gcd with arguments b and the remainder of a divided by b
    return gcd(b, a % b);
  }
  // Reduce the array of numbers by multiplying each number together and dividing by their gcd
  // This finds the Least Common Multiple (LCM) of the numbers in the array
  return numbers.reduce((a, b) => a * b / gcd(a, b));
}

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

  console.log(factors);
  return lcm(factors);
}