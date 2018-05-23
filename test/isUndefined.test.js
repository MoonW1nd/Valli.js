/* eslint-disable no-undef */
const { is } = require('../Valli.js');


describe('isUndefined type check', () => {
  const correctTypes = [undefined];
  const wrongTypes = [30, 0, 1, Infinity, -Infinity, '', 'true', 'false', true, false, NaN, [], {}, new Date(), null];
  correctTypes.forEach((value) => {
    test(`${value} must be equal undefined`, () => {
      expect(is.undefined(value)).toBe(true);
    });
  });

  wrongTypes.forEach((value) => {
    it(`${value} must be not equal undefined type`, () => {
      expect(is.undefined(value)).toBe(false);
    });
  });
});
