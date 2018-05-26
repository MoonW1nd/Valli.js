/* eslint-disable no-undef */
const { is } = require('../Valli.js');


describe('isNaN type check', () => {
  const correctTypes = [NaN];
  const wrongTypes = [30, 0, 1, Infinity, -Infinity, '', 'true', 'false', true, false, null, {}, new Object(), { 1: 0 }, { x: 'fdkfd' }, new Date(), new RegExp, [], new Array(), new String(), new Number(), new Boolean()]; //eslint-disable-line
  correctTypes.forEach((value) => {
    test(`${value} must be equal NaN`, () => {
      expect(is.nan(value)).toBe(true);
    });
  });

  wrongTypes.forEach((value) => {
    it(`${value} must be not equal NaN type`, () => {
      expect(is.nan(value)).toBe(false);
    });
  });
});
