/* eslint-disable no-undef */
const { is, checkTypes } = require('../../valli');


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
    {
      testInstance: 'Hi',
    },
    {
      testInstance: 1,
    },
  ],
];

instancesObject.forEach((instanceObject, indexInstance) => {
  describe(`oneOf() types: object instance #${indexInstance}`, () => {
    const interfaceObject = {
      testInstance: is.instance.required(instanceObject),
    };

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
