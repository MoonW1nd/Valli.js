/* eslint-disable no-undef */
const { is } = require('../../Valli.js');


describe('isString type check', () => {
  const correctTypes = ['30', 'dfsdhfsdf', 'NaN', 'undefined', '30fdkdjfd', 'true', 'flase', new String()]; //eslint-disable-line
  const wrongTypes =
    [30, true, false, undefined, [], {}, new Date(), null, NaN, Infinity, -Infinity, 0, -0];
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
