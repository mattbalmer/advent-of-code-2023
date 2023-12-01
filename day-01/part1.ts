import { Execute } from './format';
import { toInt } from '@utils/numbers';
import { sum } from '@utils/array';
import { firstNum } from './shared';

export const execute: Execute = (lines) => {
  return sum(
    lines.map(line => {
      const chars = line.split('');
      const first = chars.find(firstNum);
      const last = chars.reverse().find(firstNum);
      return toInt(`${first}${last}`);
    })
  );
}