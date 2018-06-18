/* eslint-disable no-undef */
const { is } = require('../../valli');


describe('isNumber type check', () => {
  const correctTypes = [30, 1, 0, -0, 5, Infinity, -Infinity, 0.4, 2.454, new Number(), NaN];//eslint-disable-line
  const wrongTypes = ['30', 'jfdghsjd', 'fshdf238', true, false, undefined, [], {}, new Date(), null];
  correctTypes.forEach((value) => {
    test(`${value} must be equal number type`, () => {
      expect(is.number(value)).toBe(true);
    });
  });

  test('NaN must return false', () => {
    expect(is.number(NaN)).toBe(true);
  });

  wrongTypes.forEach((value) => {
    it(`${value} must be not equal number type`, () => {
      expect(is.number(value)).toBe(false);
    });
  });
});
