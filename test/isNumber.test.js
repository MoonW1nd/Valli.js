/* eslint-disable no-undef */
const { is } = require('../Valli.js');


test('isNumber return true if add value is number', () => {
  expect(is.number(2)).toBe(true);
});
