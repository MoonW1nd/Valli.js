/* eslint-disable no-undef */
const { is, validate } = require('../../Valli.js');


describe('isObject type check', () => {
  const interfaceObject = {
    person: is.shape.required({
      name: is.string.required,
      age: is.number,
    }),
  };

  const correctObjects = [
    {
      person: {
        name: 'Alex',
        age: 34,
      },
    },
    {
      person: {
        name: 'lol',
      },
    },
    {
      person: {
        name: 'dfdsd',
        age: 1,
      },
    },
  ];

  const wrongObjects = [
    {
      person: {
        name: null,
        age: 2,
      },
    },
    {},
    {
      person: {},
    },
  ];

  correctObjects.forEach((value) => {
    test(`${value} must be equal object`, () => {
      expect(validate(value, interfaceObject)).toBe(true);
    });
  });

  wrongObjects.forEach((value) => {
    it(`${value} must be not equal object type`, () => {
      expect(validate(value, interfaceObject)).toBe(false);
    });
  });
});
