// 530 chars

let g = (a, b) => (b === 0 ? a : g(b, a % b));
let lc = n => n.reduce((a, b) => a * b / g(a, b));

export const execute = l => {
  let m = l.slice(2).reduce((m, d) => {
    const [, n, l, r] = d.match(/([A-Z]+) = \(([A-Z]+), ([A-Z]+)\)/);
    m[n] = [l, r];
    return m;
  }, {});

  let n = Object.keys(m).filter(k => k[2] == 'A');

  return lc(
    n.map(n => {
      let s = 0;
      while (n[2] != 'Z') {
        n = m[n]['LR'.indexOf(l[0][s++ % l[0].length])];
      }
      return s;
    })
  );
};
