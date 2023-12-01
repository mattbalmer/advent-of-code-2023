import { generate } from '@utils/array';

export const ALPHABET = generate<string>(26, (i) =>
  String.fromCharCode(97 + i)
);

export const reverse = (str: string): string =>
  str.split('').reverse().join('');