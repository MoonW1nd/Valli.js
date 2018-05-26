/* eslint-disable no-undef */
const { is } = require('../../Valli.js');


describe('isNull type check', () => {
  const correctTypes = [null];
  const wrongTypes = [30, 0, 1, Infinity, -Infinity, '', 'true', 'false', true, false, NaN, {}, new Object(), { 1: 0 }, { x: 'fdkfd' }, new Date(), new RegExp, [], new Array(), new String(), new Number(), new Boolean()]; //eslint-disable-line
  correctTypes.forEach((value) => {
    test(`${value} must be equal null`, () => {
      expect(is.null(value)).toBe(true);
    });
  });

  wrongTypes.forEach((value) => {
    it(`${value} must be not equal null`, () => {
      expect(is.null(value)).toBe(false);
    });
  });
});
