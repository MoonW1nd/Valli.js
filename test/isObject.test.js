/* eslint-disable no-undef */
const { is } = require('../Valli.js');


describe('isObject type check', () => {
  const correctTypes = [{}, new Object(), { 1: 0 }, { x: 'fdkfd' }, new Date(), new RegExp, //eslint-disable-line
    [], new Array(), new String(), new Number(), new Boolean(), new Function()]; //eslint-disable-line
  const wrongTypes = [30, 0, 1, Infinity, -Infinity, '', 'true', 'false', true, false, NaN, null];

  correctTypes.forEach((value) => {
    test(`${value} must be equal object`, () => {
      expect(is.object(value)).toBe(true);
    });
  });

  wrongTypes.forEach((value) => {
    it(`${value} must be not equal object type`, () => {
      expect(is.object(value)).toBe(false);
    });
  });
});
