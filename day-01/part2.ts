import { Execute } from './format';
import { toInt } from '@utils/numbers';
import { sum } from '@utils/array';

const NUMBERS = ['one','two','three','four','five','six','seven','eight','nine'];

export const execute: Execute = (lines) => {
  return sum(
    lines.map((line, iL) => {
      let value = '';
      let window = '';
      let i = 0;
      let d = 1;

      while (i < line.length && i >= 0 && value.length < 2) {
        const c = line[i];
        const n = toInt(c);

        if (!isNaN(n)) {
          value += c;
          d *= -1;
          window = '';
          i = line.length;
        } else {
          window = d > 0 ? `${window}${c}` : `${c}${window}`;

          const numberIndex = NUMBERS.findIndex(number => window.includes(number));
          if (numberIndex >= 0) {
            value += `${numberIndex + 1}`;
            d *= -1;
            window = '';
            i = line.length;
          }
        }

        i += d;
      }

      return toInt(`${value}`);
    })
  );
}