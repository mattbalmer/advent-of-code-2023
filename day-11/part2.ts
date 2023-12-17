import { Execute } from './format';
import { coordFromString, Coordinate, coordToString, distanceCardinal } from '@utils/grid';
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

const expand = (galaxies: Map<number, Coordinate>, factor: number): void => {
  // expand X
  const sortByX = [...galaxies.entries()]
    .sort((a, b) => a[1][0] - b[1][0])
    .map(([n, c]) => n);

  for (let i = 1; i < sortByX.length; i++) {
    const [a, b] = [
      sortByX[i - 1],
      sortByX[i],
    ];

    const dist = galaxies.get(b)[0] - galaxies.get(a)[0];

    if (dist < 2) {
      continue;
    }

    const growth = (dist - 1) * factor - 1;
    const min = galaxies.get(b)[0];

    shiftGalaxies(
      galaxies,
      (n, c) => c[0] >= min,
      (n, c) => [
        c[0] + growth,
        c[1],
      ]
    );
  }

  // expand Y
  const sortByY = [...galaxies.entries()]
    .sort((a, b) => a[1][1] - b[1][1])
    .map(([n, c]) => n);

  for (let i = 1; i < sortByY.length; i++) {
    const [a, b] = [
      sortByY[i - 1],
      sortByY[i],
    ];

    const dist = galaxies.get(b)[1] - galaxies.get(a)[1];

    if (dist < 2) {
      continue;
    }

    const growth = (dist - 1) * factor - 1;
    const min = galaxies.get(b)[1];

    shiftGalaxies(
      galaxies,
      (n, c) => c[1] >= min,
      (n, c) => [
        c[0],
        c[1] + growth,
      ]
    );
  }
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

const printGalaxies = (galaxies: Map<number, Coordinate>): void => {
  const galaxyList = [...galaxies.entries()];
  const galaxyLookupMap = new Map<string, number>(
    galaxyList.map(([n, c]) => {
      const str = coordToString(c);
      return [str, n];
    })
  );
  const coords = galaxyList.map(([n, c]) => c);
  const width = Math.max(...coords.map(([x, y]) => x));
  const height = Math.max(...coords.map(([x, y]) => y));

  for(let y = 0; y <= height; y++) {
    let line = '';
    for(let x = 0; x <= width; x++) {
      const value = galaxyLookupMap.get(coordToString([x, y]));

      if (value) {
        line += value;
      } else {
        line += '.';
      }
    }
    console.log(line);
  }
}

export const execute: Execute = (lines, EXPANSION_FACTOR = 1_000_000) => {
  console.log('expand by', EXPANSION_FACTOR);
  const galaxies = mark(lines);
  expand(galaxies, EXPANSION_FACTOR);

  const pairs = getPairs(galaxies);
  const pairCoords = pairs.map((nodes) =>
    nodes.map(node => galaxies.get(node))
  );
  console.log(pairs.length);
  console.log(pairs);
  console.log(pairCoords);

  return sum(
    pairCoords.map(([a, b]) => distanceCardinal(a, b))
  );
}