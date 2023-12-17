import { generate } from '@utils/array';

export const ALPHABET = generate<string>(26, (i) =>
  String.fromCharCode(97 + i)
);

export const insert = (subject: string, i: number, object: string): string =>
  subject.substring(0, i) + object + subject.substring(i);