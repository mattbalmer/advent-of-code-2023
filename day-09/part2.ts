import { Execute } from './format';
import { toInt } from '@utils/numbers';
import { sum } from '@utils/array';

type Sequence = number[];

const findDifference = (sequence: Sequence): number | Sequence => {
  let diff;
  let isConstant = true;
  let differences = [];

  for(let i = 1; i < sequence.length; i++) {
    const [l, r] = sequence.slice(i - 1, i + 1);
    if (diff !== undefined && l - r !== diff) {
      isConstant = false;
    }
    diff = r - l;
    differences.push(diff);
  }

  return isConstant ? diff : differences;
}

const findNextTerm = (sequence: Sequence): number => {
  let differences: Sequence[] = [
    findDifference(sequence) as Sequence
  ];
  let prevTerm;

  while (prevTerm === undefined) {
    const diff = findDifference(
      differences[differences.length - 1]
    );

    if (Array.isArray(diff)) {
      differences.push(diff);
    } else {
      prevTerm = diff;
    }
  }

  while (differences.length > 0) {
    const diff = differences.pop();
    prevTerm = diff[0] - prevTerm;
  }

  return sequence[0] - prevTerm;
}

export const execute: Execute = (lines) => {
  const histories = lines.map(line => line.split(' ').map(toInt));

  return sum(
    histories.map(findNextTerm)
  );
}