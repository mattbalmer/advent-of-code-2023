// 323 chars

export const execute = l => {
  let m = l.slice(2).reduce((m, d) => {
    const [, n, l, r] = d.match(/([A-Z]+) = \(([A-Z]+), ([A-Z]+)\)/);
    m[n] = [l, r];
    return m;
  }, {});

  let n = 'AAA';
  let s = 0;

  while (n !== 'ZZZ') {
    n = m[n][['L', 'R'].indexOf(l[0][s++ % l[0].length])];
  }

  return s;
};