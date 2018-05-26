/* eslint-disable no-undef */
const { is } = require('../Valli.js');


describe('isFunction type check', () => {
  const correctTypes = [new Function(), function() {}, () => 43 ]; //eslint-disable-line
  const wrongTypes = [{}, new Object(), { 1: 0 }, { x: 'fdkfd' }, new Date(), new RegExp, //eslint-disable-line
    [], new Array(), new String(), new Number(), new Boolean()]; //eslint-disable-line

  correctTypes.forEach((value) => {
    test(`${value} must be equal function type`, () => {
      expect(is.function(value)).toBe(true);
    });
  });

  wrongTypes.forEach((value) => {
    it(`${value} must be not equal function type`, () => {
      expect(is.function(value)).toBe(false);
    });
  });
});
