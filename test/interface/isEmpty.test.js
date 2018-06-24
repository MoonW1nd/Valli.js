/* eslint-disable no-undef */
const { is } = require('../../valli');


describe('isEmpty check', () => {
  const correctTypes = [[], {}, '', new Array, new Array(10), new Object, new Date()]; //eslint-disable-line
  const wrongTypes = [
    30, 0, 1, Infinity, -Infinity, { a: 1 }, 'true',
    'false', true, false, NaN,
    null, undefined, [2, true],
  ];//eslint-disable-line
  correctTypes.forEach((value) => {
    test(`${value} must be empty`, () => {
      expect(is.empty(value)).toBe(true);
    });
  });

  wrongTypes.forEach((value) => {
    it(`${value} must be not empty`, () => {
      expect(is.empty(value)).toBe(false);
    });
  });
});
