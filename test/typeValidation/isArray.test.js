/* eslint-disable no-undef */
const { is } = require('../../valli');


describe('isArray type check', () => {
  const correctTypes = [[], [1, 3, 4], ['srring', '', '342'], new Array()]; //eslint-disable-line
  const wrongTypes = [30, 0, 1, Infinity, -Infinity, '', 'true', 'false', true, false, NaN, {}, new Date(), null, undefined];
  correctTypes.forEach((value) => {
    test(`${value} must be equal array`, () => {
      expect(is.array(value)).toBe(true);
    });
  });

  wrongTypes.forEach((value) => {
    it(`${value} must be not equal array type`, () => {
      expect(is.array(value)).toBe(false);
    });
  });
});
