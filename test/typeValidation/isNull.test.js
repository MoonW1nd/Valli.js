/* eslint-disable no-undef */
const { is } = require('../../valli.js');

const correctTypes = [null];
const wrongTypes = [30, 0, 1, Infinity, -Infinity, '', 'true', 'false', true, false, NaN, {}, new Object(), { 1: 0 }, { x: 'fdkfd' }, new Date(), new RegExp, [], new Array(), new String(), new Number(), new Boolean()]; //eslint-disable-line

describe('isNull type check', () => {
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

describe('is.not.Null type check', () => {
  correctTypes.forEach((value) => {
    test(`${value} must be equal null`, () => {
      expect(is.not.null(value)).toBe(false);
    });
  });

  wrongTypes.forEach((value) => {
    it(`${value} must be not equal null`, () => {
      expect(is.not.null(value)).toBe(true);
    });
  });
});
