/* eslint-disable no-undef */
const { is, checkTypes } = require('../../valli');


// const interfaceObject = {
//   // persons: is.array.oneOf(['number', 'string']),
//   persons: is.array.oneOf(is.number, istring),
// };
const interfacesObject = [
  {
    persons: is.array.oneOf(is.number, is.string),
  },
  {
    persons: is.array.oneOf([is.number, is.string]),
  },
  {
    persons: is.array.oneOf('number', 'string'),
  },
  {
    persons: is.array.oneOf(['number', 'string']),
  },
  {
    persons: is.array.oneOf(['number', is.string]),
  },
  {
    persons: is.array.oneOf(is.number, 'string'),
  },
];

interfacesObject.forEach((interfaceObject, indexInterface) => {
  describe(`oneOf() types: object interface #${indexInterface}`, () => {
    const correctObjects = [
      {
        persons: [1, 'dfksjfd', 3],
      },
    ];

    const wrongObjects = [
      {
        persons: [1, 'dfksjfd', {}],
      },
    ];

    correctObjects.forEach((value, i) => {
      test(`Object #${i}: must be correct interface`, () => {
        expect(checkTypes(interfaceObject, value)).toBe(true);
      });
    });

    wrongObjects.forEach((value, i) => {
      it(`Object #${i}: must be not correct interface`, () => {
        expect(checkTypes(interfaceObject, value)).toBe(false);
      });
    });
  });
});
