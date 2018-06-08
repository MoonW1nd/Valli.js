/* eslint-disable no-undef */
const { is, validate } = require('../../Valli.js');


const interfaces = [
  {
    testValue: is.array.of.string,
  },
  {
    testValue: is.array.of.shape({
      testValue: is.string,
    }),
  },
];

// console.log(is.array.of.shape({
//   testValue: is.string,
// }));

const correctObjects = [
  [
    {
      testValue: ['string'],
    },
    {},
    {
      testValue: ['lol', '', 'false', '0', '1'],
    },
    {
      testValue: [],
    },
  ],
  [
    {
      testValue: [
        {
          testValue: '1',
        },
        {
          testValue: 'teur',
        },
      ],
    },
  ],
];

const wrongObjects = [
  [
    {
      testValue: 1,
    },
    {
      testValue: true,
    },
    {
      testValue: null,
    },
    {
      testValue: [null, 'slols'],
    },
    {
      testValue: [undefined, 'hi', 'fjdsk'],
    },
    {
      testValue: [true],
    },
  ],
  [
    {
      testValue: [
        {
          testValue: '1',
        },
        {
          testValue: 1,
        },
      ],
    },
  ],
];

interfaces.forEach((interfaceObject, indexInstance) => {
  describe(`array.of types: object instance #${indexInstance}`, () => {
    correctObjects[indexInstance].forEach((value, i) => {
      test(`Object #${i}: must be correct interface`, () => {
        expect(validate(value, interfaceObject)).toBe(true);
      });
    });

    wrongObjects[indexInstance].forEach((value, i) => {
      it(`Object #${i}: must be not correct interface`, () => {
        expect(validate(value, interfaceObject)).toBe(false);
      });
    });
  });
});
