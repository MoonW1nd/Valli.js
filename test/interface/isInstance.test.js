/* eslint-disable no-undef */
const { is, validate } = require('../../Valli.js');


const instancesObject = [
  Object,
];


const correctObjects = [
  [
    {
      testInstance: {},
    },
    {
      testInstance: [],
    },
  ],
];

const wrongObjects = [
  [
    {
      testInstance: NaN,
    },
    {
      testInstance: undefined,
    },
  ],
];

instancesObject.forEach((instanceObject, indexInstance) => {
  describe(`oneOf() types: object instance #${indexInstance}`, () => {
    const interfaceObject = {
      testInstance: is.instance(instanceObject),
    };

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
