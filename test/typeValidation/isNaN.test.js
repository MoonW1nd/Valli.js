/* eslint-disable no-undef */
const { is } = require('../../valli');


const correctTypes = [NaN];
const wrongTypes = [30, 0, 1, Infinity, -Infinity, '', 'true', 'false', true, false, null, {}, new Object(), { 1: 0 }, { x: 'fdkfd' }, new Date(), new RegExp, [], new Array(), new String(), new Number(), new Boolean()]; //eslint-disable-line

describe('isNaN type check', () => {
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

describe('is.not.NaN type check', () => {
  correctTypes.forEach((value) => {
    test(`${value} must be equal NaN`, () => {
      expect(is.not.nan(value)).toBe(false);
    });
  });

  wrongTypes.forEach((value) => {
    it(`${value} must be not equal NaN type`, () => {
      expect(is.not.nan(value)).toBe(true);
    });
  });
});
