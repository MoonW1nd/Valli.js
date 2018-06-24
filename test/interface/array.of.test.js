/* eslint-disable no-undef */
const { is, checkTypes } = require('../../valli');
const valli = require('../../valli');


const interfaces = [
  {
    testValue: is.array.of.string,
  },
  {
    testValue: is.array.of.shape({
      testValue: is.string,
    }),
  },
  {
    testValue: is.array.of.instance(Object),
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
  [
    {
      testValue: [{}, [], { x: 'testValue' }],
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
  [
    {
      testValue: [{}, undefined],
    },
  ],
];

interfaces.forEach((interfaceObject, indexInstance) => {
  describe(`array.of types: object instance #${indexInstance}`, () => {
    correctObjects[indexInstance].forEach((value, i) => {
      test(`Object #${i}: must be correct interface`, () => {
        expect(checkTypes(interfaceObject, value, false)).toBe(true);
      });
    });

    wrongObjects[indexInstance].forEach((value, i) => {
      it(`Object #${i}: must be not correct interface`, () => {
        expect(checkTypes(interfaceObject, value, false)).toBe(false);
      });
    });
  });
});

interfaces.forEach((interfaceObject, indexInstance) => {
  const isObjectInterface = valli(interfaceObject);
  describe(`array.of types(currying, implementation): object instance #${indexInstance}`, () => {
    correctObjects[indexInstance].forEach((value, i) => {
      test(`Object #${i}: must be correct interface`, () => {
        expect(isObjectInterface(value)).toBe(true);
      });
    });

    wrongObjects[indexInstance].forEach((value, i) => {
      it(`Object #${i}: must be not correct interface`, () => {
        expect(isObjectInterface(value)).toBe(false);
      });
    });
  });
});
