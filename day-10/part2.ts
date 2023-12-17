import { Execute } from './format';
import { Coordinate, DIR, getCell, getDir, Grid, isValidCoordinate, setCell, traverse } from '@utils/grid';
import { generate, last } from '@utils/array';

type RealPipes = '|' | '-' | 'L' | 'J' | '7' | 'F';
type Pipe = RealPipes | '.' | 'S';

type Bounds = {
  x: [min: number, max: number],
  y: [min: number, max: number],
};

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
  bounds: Bounds,
} => {
  const [height, width] = [lines.length, lines[0].length];
  let start = null;
  const grid: Grid<Pipe> = {
    width,
    height,
    cells: []
  };
  const bounds: Bounds = {
    x: [width - 1, 0],
    y: [height - 1, 0],
  };

  for(let y = 0; y < height; y++) {
    for(let x = 0; x < width; x++) {
      const content = lines[y][x] as Pipe;
      if (content === 'S') {
        start = [x, y];
      }
      setCell(grid, [x, y], content);

      if (content !== '.') {
        bounds.x = [
          Math.min(bounds.x[0], x),
          Math.max(bounds.x[1], x),
        ];
        bounds.y = [
          Math.min(bounds.y[0], y),
          Math.max(bounds.y[1], y),
        ];
      }
    }
  }

  return {
    grid,
    start,
    bounds,
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

const intersectionsInDir = (grid: Grid<Pipe>, bounds: Bounds, coord: Coordinate, dir: DIR): number => {
  let intersections = 0;
  const axis = [DIR.LEFT, DIR.RIGHT].includes(dir) ? 'x' : 'y';
  const ascDesc = [DIR.LEFT, DIR.UP].includes(dir) ? 'des' : 'asc';
  const axisLimits = bounds[axis];
  const limit = axisLimits[ascDesc === 'asc' ? 1 : 0];
  const d = Math.abs(limit - coord[axis === 'x' ? 0 : 1]);

  console.log(d, dir, limit);

  for(let i = 1; i <= d; i++) {
    const c: Coordinate = traverse(coord, dir, i);
    const pipe = getCell(grid, c);
    if (pipe !== '.') {
      intersections++;
    }
    if (pipe !== '.') {
      console.log('intersect', coord, getCell(grid, coord), c, pipe);
    }
  }

  return intersections;
}

const isInternal = (grid: Grid<Pipe>, bounds: Bounds, coord: Coordinate): boolean => {
  // const intersections = (Object.keys(DIR) as DIR[])
  const intersections = [DIR.UP, DIR.LEFT]
    .map(dir => [dir, intersectionsInDir(grid, bounds, coord, dir)] as [DIR, number]);

  console.log('isInternal', coord, intersections);

  return intersections.some(([d, i]) => i % 2 !== 0);
}

export const execute: Execute = (lines) => {
  const { grid, start, bounds } = toGrid(lines);

  console.log('bounds', bounds);

  const path = [
    start,
    findStartConnections(grid, start)[0]
  ];

  while (true) {
    const [prev, head] = path.slice(-2);
    const current = getCell(grid, last(path));

    if (current === 'S') {
      break;
    }

    const dirIn = getDir(head, prev);
    const [dirOut] = ValidPipesByDir[current].filter(d => d !== dirIn);

    path.push(traverse(head, dirOut));
  }

  const [dx, dy] = [
    bounds.x[1] - bounds.x[0] + 1,
    bounds.y[1] - bounds.y[0] + 1
  ];
  const points = generate<Coordinate>(dx * dy, (i) => [
    bounds.x[0] + (i % dx),
    bounds.y[0] + Math.floor(i / dx)
  ]).filter(c => getCell(grid, c) === '.');
  console.log('points to check', points, points.map(c => getCell(grid, c)));

  const internal = points.filter(c => isInternal(grid, bounds, c));
  console.log(internal, internal.map(i => getCell(grid, i)))

  return internal.length;
}