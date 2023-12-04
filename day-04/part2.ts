import { Execute } from './format';

class MultiplierMap extends Map<number, number> {
  get(key: number) {
    return super.get(key) ?? 1;
  }

  increment(key: number, amount: number = 1) {
    this.set(key, this.get(key) + amount);
  }
}

export const execute: Execute = (cards) => {
  const multipliers = new MultiplierMap;
  let points = 0;

  for (const card of cards) {
    const { winning, given } = card;
    const matching = [...given].filter(n => winning.has(n));
    const count = matching.length;

    const multiplier = multipliers.get(card.id);
    points += 1;

    for (let i = 1; i <= count; i++) {
      multipliers.increment(card.id + i, multiplier);
      points += multiplier;
    }
  }

  return points;
}