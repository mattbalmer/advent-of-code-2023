import { Execute } from './format';
import { Coordinate } from '@utils/grid';
import { isInt, toInt } from '@utils/numbers';
import { sum } from '@utils/array';

type Number = {
  value: number,
  x: [number, number],
  y: number,
};

type Schematic = {
  numbers: Number[],
  symbols: Coordinate[],
}

const toSchematic = (lines: string[]): Schematic => {
  let symbols = [];
  let numbers: Number[] = [];

  for(let y = 0; y < lines.length; y++) {
    let n = '';
    let xS = 0;
    for(let x = 0; x < lines[y].length; x++) {
      const value = lines[y][x];

      if (isInt(value)) {
        if (n === '') {
          xS = x;
        }
        n += value;
      } else {
        if (value !== '.') {
          symbols.push([x, y]);
        }

        if (n !== '') {
          numbers.push({
            value: toInt(n),
            x: [xS, x - 1],
            y,
          });
          n = '';
        }
      }
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
    .filter((num) => {
      const coords = num.x.map(x => [x, num.y] as Coordinate);

      return coords.some(c => areAdjacent(c, coord));
    })
    .map(({ value }) => value);
}

const getPartNumbers = (schematic: Schematic): number[] => {
  return schematic.symbols.reduce((numbers, symbol) => {
    const adjacentNumbers = getAdjacentNumbers(schematic.numbers, symbol);
    return [
      ...numbers,
      ...adjacentNumbers,
    ];
  }, []);
}

export const execute: Execute = (lines) => {
  const schematic = toSchematic(lines);
  console.log(schematic.numbers);
  console.log(schematic.symbols);
  const partNumbers = getPartNumbers(schematic);
  return sum(partNumbers);
}