/* eslint-disable no-undef */
const { is, validate } = require('../../Valli.js');


describe('is.shape', () => {
  const interfaceObject = {
    person: is.shape.required({
      name: is.string.required,
      age: is.number,
      loveFilms: is.shape({
        comedy: is.string,
      }),
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
    {
      person: {
        name: 'dfdsd',
        loveFilms: {
          comedy: 'Troll face',
        },
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
    {
      person: {
        name: 'dfdsd',
        loveFilms: {
          comedy: 1,
        },
      },
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
