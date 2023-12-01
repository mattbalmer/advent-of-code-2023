import { Execute } from './format';
import { toInt } from '@utils/numbers';
import { sum } from '@utils/array';
import { firstNum } from './shared';

const replaceNumbers = (line: string): string => {
  return line.replace(/(one|two|three|four|five|six|seven|eight|nine)/g, (match) => {
    const i = ['one','two','three','four','five','six','seven','eight','nine'].indexOf(match);
    return `${i + 1}`;
  });
}

export const execute: Execute = (lines) => {
  return sum(
    lines.map((line, i) => {
      const chars = replaceNumbers(line).split('');
      const first = chars.find(firstNum);
      const last = chars.slice(0).reverse().find(firstNum);
      console.log('line', i, `${first}${last}`, chars.join(''), line);
      return toInt(`${first}${last}`);
    })
  );
}