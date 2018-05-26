/* eslint-disable no-undef */
const { is } = require('../Valli.js');


describe('isBoolean type check', () => {
  const correctTypes = [true, false, new Boolean()];// eslint-disable-line
  const wrongTypes = [30, 0, 1, Infinity, -Infinity, '', 'true', 'false', undefined, [], {}, new Date(), null, new Function()];// eslint-disable-line
  correctTypes.forEach((value) => {
    test(`${value} must be equal a boolean type`, () => {
      expect(is.bool(value)).toBe(true);
    });
  });

  wrongTypes.forEach((value) => {
    it(`${value} must be not equal boolean type`, () => {
      expect(is.bool(value)).toBe(false);
    });
  });
});
