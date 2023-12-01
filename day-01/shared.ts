import { toInt } from '@utils/numbers';

export const firstNum = (char: string): boolean => !isNaN(toInt(char))