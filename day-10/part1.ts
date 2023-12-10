import { Execute } from './format';
import {
  Coordinate,
  coordToString,
  DIR,
  getCell,
  getDir,
  Grid,
  isValidCoordinate,
  setCell,
  Traversals,
  traverse
} from '@utils/grid';

type Pipe = '|' | '-' | 'L' | 'J' | '7' | 'F' | '.' | 'S';

const ValidPipesByDir: Record<Pipe, DIR[]> = {
  '|': [DIR.UP, DIR.DOWN],
  '-': [DIR.LEFT, DIR.RIGHT],
  'L': [DIR.DOWN, DIR.LEFT],
  'J': [DIR.RIGHT, DIR.DOWN],
  '7': [DIR.RIGHT, DIR.UP],
  'F': [DIR.LEFT, DIR.UP],
  'S': [DIR.LEFT, DIR.UP, DIR.DOWN, DIR.RIGHT],
  '.': [],
};

const toGrid = (lines: string[]): {
  grid: Grid<Pipe>,
  start: Coordinate,
} => {
  const [width, height] = [lines.length, lines.length];
  let start = null;
  const grid = {
    width,
    height,
    cells: []
  };

  for(let y = 0; y < height; y++) {
    for(let x = 0; x < width; x++) {
      const coord = coordToString([x, y]);
      const content = lines[y][x] as Pipe;
      setCell(grid, [x, y], content);
      if (content === 'S') {
        start = [x, y];
      }
    }
  }

  return {
    grid,
    start,
  }
}

const findAdjacentConnections = (grid: Grid<Pipe>, coord: Coordinate): Coordinate[] => {
  const adjacent = (Object.keys(DIR) as DIR[])
    .map(dir => traverse(coord, dir))
    .filter(c => isValidCoordinate(grid, c));

  return adjacent
    .filter(c => {
      const pipe = getCell(grid, c);
      const dir = getDir(coord, c);
      return ValidPipesByDir[pipe].includes(dir);
    });
}

export const execute: Execute = (lines) => {
  const { grid, start } = toGrid(lines);
  console.log('grid', grid);

  const adjacentConnections = findAdjacentConnections(grid, start);
  console.log('adj', adjacentConnections.map((c) => `${coordToString(c)}: ${getCell(grid, c)}`).join('\n'))
  return 4;
}