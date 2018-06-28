/* eslint-disable no-undef */
const { is, valli } = require('../../valli');


describe('valli (carrying interface object)', () => {
  const interfaceObject = {
    person: is.shape.required({
      name: is.string.required,
      age: is.number,
      loveFilms: is.shape({
        comedy: is.string,
      }),
    }),
  };

  const isShape = valli(interfaceObject);

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
      expect(isShape(value)).toBe(true);
    });
  });

  wrongObjects.forEach((value, i) => {
    it(`Object #${i}: must be not correct interface`, () => {
      expect(isShape(value)).toBe(false);
    });
  });
});
