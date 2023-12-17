import { it } from 'mocha';
import { expect } from 'chai';
import { execute, getData } from '@utils/data';
import { format } from './format';
import * as part1 from './part1';
import * as part2 from './part2';

const { TEST_DATA, DATA } = getData(
  11
);

describe(`Day 11`, () => {
  describe('part 1', () => {
    it('should work on test case', () => {
      const expected = 374;
      const result = execute(part1, TEST_DATA, format, 2);

      expect(result).to.equal(expected);
    });

    // it('should give the real answer', () => {
    //   const result = execute(part1, DATA, format);
    //
    //   console.log(result);
    // });
  });

  describe('part 2', () => {
    it('should work on test case (2X)', () => {
      const expected = 374;
      const result = execute(part2, TEST_DATA, format, 2);

      expect(result).to.equal(expected);
    });

    it('should work on test case (10x)', () => {
      const expected = 1030;
      const result = execute(part2, TEST_DATA, format, 10);

      expect(result).to.equal(expected);
    });

    it('should work on test case (100x)', () => {
      const expected = 8410;
      const result = execute(part2, TEST_DATA, format, 100);

      expect(result).to.equal(expected);
    });

    it('should work on test case (1_000_000x)', () => {
      const expected = 82000210;
      const result = execute(part2, TEST_DATA, format, 1_000_000);

      expect(result).to.equal(expected);
    });

    it('should work on part 1 real data and factor 2x', () => {
      const expected = 9329143;
      const result = execute(part2, DATA, format, 2);

      expect(result).to.equal(expected);
    });

    // it('should give the real answer', () => {
    //   const result = execute(part2, DATA, format);
    //
    //   console.log(result);
    // });
  });
});