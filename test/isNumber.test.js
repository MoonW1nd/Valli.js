/* eslint-disable no-undef */
const { is } = require('../Valli.js');


describe('isNumber type check', () => {
  const correctTypes = [30, 1, 0, -0, 5, Infinity, -Infinity, 0.4, 2.454, new Number()];//eslint-disable-line
  const wrongTypes = ['30', 'jfdghsjd', 'fshdf238', true, false, undefined, [], {}, new Date(), null, NaN];
  correctTypes.forEach((value) => {
    test(`${value} must be equal number type`, () => {
      expect(is.number(value)).toBe(true);
    });
  });

  test('NaN must return false', () => {
    expect(is.number(NaN)).toBe(false);
  });

  wrongTypes.forEach((value) => {
    it(`${value} must be not equal number type`, () => {
      expect(is.number(value)).toBe(false);
    });
  });
});
