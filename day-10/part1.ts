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
  traverse
} from '@utils/grid';
import { last } from '@utils/array';

type RealPipes = '|' | '-' | 'L' | 'J' | '7' | 'F';
type Pipe = RealPipes | '.' | 'S';

const ValidPipesByDir: Record<Pipe, DIR[]> = {
  '|': [DIR.UP, DIR.DOWN],
  '-': [DIR.LEFT, DIR.RIGHT],
  'L': [DIR.RIGHT, DIR.UP],
  'J': [DIR.UP, DIR.LEFT],
  '7': [DIR.LEFT, DIR.DOWN],
  'F': [DIR.RIGHT, DIR.DOWN],
  'S': [DIR.RIGHT, DIR.DOWN, DIR.LEFT, DIR.RIGHT],
  '.': [],
};

const toGrid = (lines: string[]): {
  grid: Grid<Pipe>,
  start: Coordinate,
} => {
  const [width, height] = [lines.length, lines.length];
  let start = null;
  const grid: Grid<Pipe> = {
    width,
    height,
    cells: []
  };

  for(let y = 0; y < height; y++) {
    for(let x = 0; x < width; x++) {
      const content = lines[y][x] as Pipe;
      if (content === 'S') {
        start = [x, y];
      }
      setCell(grid, [x, y], content);
    }
  }

  return {
    grid,
    start,
  }
}

const findStartConnections = (grid: Grid<Pipe>, coord: Coordinate): Coordinate[] => {
  return (Object.keys(DIR) as DIR[])
    .map(dir => traverse(coord, dir))
    .filter(c => isValidCoordinate(grid, c))
    .filter(c => {
      const pipe = getCell(grid, c);
      const dir = getDir(c, coord);
      return ValidPipesByDir[pipe].includes(dir);
    });
}

export const execute: Execute = (lines) => {
  const { grid, start } = toGrid(lines);

  const path = [
    start,
    findStartConnections(grid, start)[0]
  ];

  while (true) {
    const [prev, head] = path.slice(-2);
    const current = getCell(grid, last(path));

    if (current === 'S') {
      return Math.floor(path.length / 2);
    }

    const dirIn = getDir(head, prev);
    const [dirOut] = ValidPipesByDir[current].filter(d => d !== dirIn);

    path.push(traverse(head, dirOut));
  }
}