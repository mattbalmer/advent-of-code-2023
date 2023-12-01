import { Execute } from './format';
import { toInt } from '@utils/numbers';
import { sum } from '@utils/array';
import { reverse } from '@utils/strings';

const NUMBERS = ['one','two','three','four','five','six','seven','eight','nine'];
const NUMBERS_REVERSE = NUMBERS.map(reverse);

const replaceForward = (str: string): string => str.replace(
  new RegExp(NUMBERS.join('|')),
  (match) => `${NUMBERS.indexOf(match) + 1}`
);

const replaceBackward = (str: string): string => reverse(
  reverse(str).replace(
    new RegExp(NUMBERS_REVERSE.join('|')),
    (match) => `${NUMBERS_REVERSE.indexOf(match) + 1}`
  )
);

const replaceStringNumbers = (line: string): string => {
  return replaceBackward(
    replaceForward(line)
  );
}

export const firstNum = (char: string): boolean => !isNaN(toInt(char))

export const execute: Execute = (lines) => {
  return sum(
    lines.map(line => {
      const chars = replaceStringNumbers(line).split('');
      const first = chars.find(firstNum);
      const last = chars.reverse().find(firstNum);
      return toInt(`${first}${last}`);
    })
  );
}