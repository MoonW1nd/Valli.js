/* eslint-disable no-undef */
const { is } = require('../Valli.js');


describe('isNumber type check', () => {
  const testTypes = ['30', 'jfdghsjd', 'fshdf238', true, false, undefined, [], {}, new Date(), null];
  test('return true', () => {
    expect(is.number(2)).toBe(true);
  });

  test('NaN return false', () => {
    expect(is.number(NaN)).toBe(false);
  });

  testTypes.forEach((value) => {
    it(`ohters types: ${value}`, () => {
      expect(is.number(value)).toBe(false);
    });
  });
});
