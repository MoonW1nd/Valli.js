/* eslint-disable no-undef */
const { is, validate } = require('../../Valli.js');


describe('oneOf() types', () => {
  const interfaceObject = {
    persons: is.array.oneOf(['number', 'string']),
  };

  const correctObjects = [
    {
      persons: [1, 'dfksjfd', 3],
    },
  ];

  const wrongObjects = [
    {
      persons: [1, 'dfksjfd', null],
    },
  ];

  correctObjects.forEach((value, i) => {
    test(`Object #${i}: must be correct interface`, () => {
      expect(validate(value, interfaceObject)).toBe(true);
    });
  });

  wrongObjects.forEach((value, i) => {
    it(`Object #${i}: must be not correct interface`, () => {
      expect(validate(value, interfaceObject)).toBe(false);
    });
  });
});
