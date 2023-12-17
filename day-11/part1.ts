import { Execute } from './format';
import { insert } from '@utils/strings';
import { coordFromString, coordsForIndex, distanceCardinal, Grid, setCell } from '@utils/grid';
import { hidden } from 'chalk';
import { sum } from '@utils/array';

const expand = (input: readonly string[]): string[] => {
  let lines = input.slice(0);
  for(let x = 0; x < lines.length; x++) {
    const line = lines[x];
    if (!line.includes('#')) {
      lines.splice(x, 0, `.`.repeat(line.length))
      x++;
    }
  }

  for(let y = 0; y < lines[0].length; y++) {
    const line = lines.map(l => l[y]);
    if (!line.includes('#')) {
      lines = lines.map(l => insert(l, y, '.'));
      y++;
    }
  }

  return lines;
}

const toGrid = (lines: string[]): Grid<number> => {
  let n = 1;

  const grid: Grid<number> = {
    cells: [],
    width: lines[0].length,
    height: lines.length,
  };

  for(let y = 0; y < grid.height; y++) {
    for(let x = 0; x < grid.width; x++) {
      const value = lines[y][x] === '#' ? n++ : null;

      if (value) {
        setCell(grid, [x, y], value);
      }
    }
  }

  return grid;
}

const getPairs = (grid: Grid<number>): [number, number][] => {
  const pairs = new Set<string>();
  const largest = grid.cells.slice(0).reverse().find(_ => !!_);
  for(let a = 1; a <= largest; a++) {
    for(let b = 1; b <= largest; b++) {
      if (a === b) {
        continue;
      }
      pairs.add([a, b].sort().join(', '));
    }
  }
  return Array.from(pairs).map(coordFromString);
}

export const execute: Execute = (lines) => {
  const grid = toGrid(
    expand(lines)
  );

  const pairs = getPairs(grid);
  const pairCoords = pairs.map((nodes) =>
    nodes.map(node =>
      coordsForIndex(
        grid,
        grid.cells.indexOf(node)
      )
    )
  );

  return sum(
    pairCoords.map(([a, b]) => distanceCardinal(a, b))
  );
}