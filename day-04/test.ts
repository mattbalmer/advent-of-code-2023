import { it } from 'mocha';
import { expect } from 'chai';
import { execute, getData } from '@utils/data';
import { format } from './format';
import * as part1 from './part1';
import * as part2 from './part2';

const { TEST_DATA, DATA } = getData(
  4
);

describe(`Day 4`, () => {
  describe('part 1', () => {
    it('should work on test case', () => {
      const expected = 13;
      const result = execute(part1, TEST_DATA, format);

      expect(result).to.equal(expected);
    });

    // it('should give the real answer', () => {
    //   const result = execute(part1, DATA, format);
    //
    //   console.log(result);
    // });
  });

  describe('part 2', () => {
    it('should work on test case', () => {
      const expected = 30;
      const result = execute(part2, TEST_DATA, format);

      expect(result).to.equal(expected);
    });

    // it('should give the real answer', () => {
    //   const result = execute(part2, DATA, format);
    //
    //   console.log(result);
    // });
  });
});