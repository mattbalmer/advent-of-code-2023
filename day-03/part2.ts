import { Execute } from './format';
import { Coordinate } from '@utils/grid';
import { isInt, toInt } from '@utils/numbers';
import { generate, mult, sum } from '@utils/array';

type Number = {
  value: number,
  x: number,
  y: number,
};

type Symbol = {
  value: string,
  x: number,
  y: number,
}

type Schematic = {
  numbers: Number[],
  symbols: Symbol[],
}

const numLen = (n: number) => `${n}`.length;

const toSchematic = (lines: string[]): Schematic => {
  let symbols: Symbol[] = [];
  let numbers: Number[] = [];

  for(let y = 0; y < lines.length; y++) {
    let n = '';
    for(let x = 0; x < lines[y].length; x++) {
      const value = lines[y][x];

      if (isInt(value)) {
        n += value;
      } else {
        if (value !== '.') {
          symbols.push({ x, y, value });
        }

        if (n !== '') {
          const int = toInt(n);
          numbers.push({
            value: int,
            x: x - numLen(int),
            y,
          });
          n = '';
        }
      }
    }

    if (n !== '') {
      const int = toInt(n);
      numbers.push({
        value: int,
        x: lines[y].length - numLen(int),
        y,
      });
    }
  }

  return {
    numbers,
    symbols,
  }
}

const areAdjacent = (a: Coordinate, b: Coordinate): boolean => {
  return Math.abs(a[0] - b[0]) < 2 && Math.abs(a[1] - b[1]) < 2;
}

const getAdjacentNumbers = (numbers: Number[], coord: Coordinate): number[] => {
  return numbers
    .filter(({ value, x, y }) => {
      const coords = generate(numLen(value), i => [x + i, y] as Coordinate);

      return coords.some(c => areAdjacent(c, coord));
    })
    .map(({ value }) => value);
}

const getGearRatios = (schematic: Schematic): number[][] => {
  return schematic.symbols
    .filter(({ value }) => value === '*')
    .map(symbol => getAdjacentNumbers(schematic.numbers, [symbol.x, symbol.y]))
    .filter(nums => nums.length === 2)
}

export const execute: Execute = (lines) => {
  const schematic = toSchematic(lines);
  const gearRatios = getGearRatios(schematic);
  console.log(gearRatios);
  return sum(
    gearRatios.map(mult)
  );
}