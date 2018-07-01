/* eslint-disable no-undef */
const { is } = require('../../valli.js');


const correctTypes = [undefined];
const wrongTypes = [30, 0, 1, Infinity, -Infinity, '', 'true', 'false', true, false, NaN, [], {}, new Date(), null];

describe('isUndefined type check', () => {
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

describe('is.not.Undefined type check', () => {
  correctTypes.forEach((value) => {
    test(`${value} must be equal undefined`, () => {
      expect(is.not.undefined(value)).toBe(false);
    });
  });

  wrongTypes.forEach((value) => {
    it(`${value} must be not equal undefined type`, () => {
      expect(is.not.undefined(value)).toBe(true);
    });
  });
});
