/* eslint-disable no-undef */
const { is } = require('../Valli.js');


describe('isDate type check', () => {
  const correctTypes = [new Date(), new Date(1)]; //eslint-disable-line
  const wrongTypes = [30, 0, 1, Infinity, -Infinity, '', 'true', 'false', true, false, NaN, null, {}, new Object(), new RegExp, [], new Array(), new String(), new Number(), new Boolean()]; //eslint-disable-line
  correctTypes.forEach((value) => {
    test(`${value} must be equal object Date`, () => {
      expect(is.date(value)).toBe(true);
    });
  });

  wrongTypes.forEach((value) => {
    it(`${value} must be not equal object Date type`, () => {
      expect(is.date(value)).toBe(false);
    });
  });
});
