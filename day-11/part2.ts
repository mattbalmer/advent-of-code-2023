import { Execute } from './format';
import { coordFromString, Coordinate, distanceCardinal } from '@utils/grid';
import { sum } from '@utils/array';

const mark = (lines: string[]) => {
  const coords = new Map<number, Coordinate>();
  let n = 1;

  for(let y = 0; y < lines.length; y++) {
    for(let x = 0; x < lines[0].length; x++) {
      const value = lines[y][x] === '#';

      if (value) {
        coords.set(n++, [x, y]);
      }
    }
  }

  return coords;
}

const shiftGalaxies = (
  galaxies: Map<number, Coordinate>,
  test: (n: number, coord: Coordinate) => boolean,
  transform: (n: number, coord: Coordinate) => Coordinate,
): void => {
  galaxies.forEach((c, n, map) => {
    if (test(n, c)) {
      galaxies.set(n, transform(n, c));
    }
  });
}

const expandAxis = (galaxies: Map<number, Coordinate>, factor: number, axis: 'x' | 'y'): void => {
  const AXIS_INDEX = axis === 'x' ? 0 : 1;

  const sortByAxis = [...galaxies.entries()]
    .sort((a, b) => a[1][AXIS_INDEX] - b[1][AXIS_INDEX])
    .map(([n, c]) => n);

  for (let i = 1; i < sortByAxis.length; i++) {
    const [a, b] = [
      sortByAxis[i - 1],
      sortByAxis[i],
    ];

    const dist = galaxies.get(b)[AXIS_INDEX] - galaxies.get(a)[AXIS_INDEX];

    if (dist < 2) {
      continue;
    }

    const space = dist - 1;
    const growth = space * factor - space;
    const growthMatrix = [
      axis === 'x' ? growth : 0,
      axis === 'y' ? growth : 0,
    ];

    const min = galaxies.get(b)[AXIS_INDEX];

    shiftGalaxies(
      galaxies,
      (n, c) => c[AXIS_INDEX] >= min,
      (n, c) => [
        c[0] + growthMatrix[0],
        c[1] + growthMatrix[1],
      ]
    );
  }
}

const expand = (galaxies: Map<number, Coordinate>, factor: number): void => {
  expandAxis(galaxies, factor, 'x');
  expandAxis(galaxies, factor, 'y');
};

const getPairs = (galaxies: Map<number, Coordinate>): [number, number][] => {
  const pairs = new Set<string>();
  const largest = [...galaxies.keys()].reverse()[0];
  for(let a = 1; a <= largest; a++) {
    for(let b = 1; b <= largest; b++) {
      if (a === b) {
        continue;
      }
      pairs.add([a, b].sort().join(','));
    }
  }
  return Array.from(pairs).map(coordFromString);
}

export const execute: Execute = (lines, EXPANSION_FACTOR = 1_000_000) => {
  console.log('expand by', EXPANSION_FACTOR);
  const galaxies = mark(lines);
  expand(galaxies, EXPANSION_FACTOR);

  const pairs = getPairs(galaxies);
  const pairCoords = pairs.map((nodes) =>
    nodes.map(node => galaxies.get(node))
  );

  return sum(
    pairCoords.map(([a, b]) => distanceCardinal(a, b))
  );
}