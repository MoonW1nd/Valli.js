/* eslint-disable no-undef */
const { is } = require('../../valli.js');

const correctTypes = ['30', 'dfsdhfsdf', 'NaN', 'undefined', '30fdkdjfd', 'true', 'flase', new String()]; //eslint-disable-line
const wrongTypes =
  [30, true, false, undefined, [], {}, new Date(), null, NaN, Infinity, -Infinity, 0, -0];

describe('isString type check', () => {
  correctTypes.forEach((value) => {
    test(`${value} must be equal a string type`, () => {
      expect(is.string(value)).toBe(true);
    });
  });

  wrongTypes.forEach((value) => {
    it(`${value} must be not equal string type`, () => {
      expect(is.string(value)).toBe(false);
    });
  });
});

describe('is.not.String type check', () => {
  correctTypes.forEach((value) => {
    test(`${value} must be equal a string type`, () => {
      expect(is.not.string(value)).toBe(false);
    });
  });

  wrongTypes.forEach((value) => {
    it(`${value} must be not equal string type`, () => {
      expect(is.not.string(value)).toBe(true);
    });
  });
});
