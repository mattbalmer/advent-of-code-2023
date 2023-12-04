import { Execute } from './format';
import { sum } from '@utils/array';

export const execute: Execute = (cards) => {
  return sum(
    cards
      .map(card => {
        const { winning, given } = card;
        const matching = [...given].filter(n => winning.has(n));
        return matching.length > 0 ? Math.pow(2, matching.length - 1) : 0;
      })
  )
}