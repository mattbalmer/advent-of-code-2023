export const toInt = (string: string): number => parseInt(string, 10);

export const isInt = (string: string): boolean => !isNaN(toInt(string));

export const gcd = (a: number, b: number): number =>
  b === 0 ? a : gcd(b, a % b);

export const lcm = (numbers: number[]): number =>
  numbers.reduce((a, b) => a * b / gcd(a, b));