((root, libraryModule) => {
  if (typeof exports === 'object') {
    // Node for Jest testing
    module.exports = libraryModule();
  } else {
    libraryModule();
  }
})(this, () => {
  /*
    Check types functions
  */
  const isNumber = value => toString.call(value) === '[object Number]' && value === value // eslint-disable-line
  const isString = value => toString.call(value) === '[object String]';
  const isBoolean = value => toString.call(value) === '[object Boolean]';
  const isUndefined = value => toString.call(value) === '[object Undefined]';
  const isArray = value => toString.call(value) === '[object Array]';
  const isObject = value => Object(value) === value;
  const isDate = value => toString.call(value) === '[object Date]';
  const isFunction = value => toString.call(value) === '[object Function]';
  const isNaN = value => value !== value; // eslint-disable-line
  const isNull = value => value === null;

  const isEmpty = (value) => {
    if (isObject(value)) {
      const { length } = Object.keys(value);
      if (length === 0) return true;
      return false;
    }
    return value === '';
  };


  /*
    Validate interface function
  */
  function validateInterface(options, optionsInterface) {
    let interfaceIsValid = true;

    const interfaceProps = Object.keys(optionsInterface);

    interfaceProps.forEach((property) => {
      const interfaceValidationFunction = optionsInterface[property];
      const value = options[property];

      if (!isFunction(interfaceValidationFunction)) {
        throw TypeError(`[Valli.js]: interface for property ${property} not correct define.`);
      }


      if (property in options || interfaceValidationFunction.name === 'required') {
        if (!interfaceValidationFunction(value)) interfaceIsValid = false;
      }
    });

    return interfaceIsValid;
  }


  function shape(shapeInterface, isRequired = false) {
    if (isRequired) {
      return function required(value) {
        if (!isObject(value)) return false;
        if (isObject(shapeInterface)) return validateInterface(value, shapeInterface);
        return false;
      };
    }

    return (value) => {
      if (isObject(shapeInterface)) {
        return validateInterface(value, shapeInterface);
      }
      return false;
    };
  }


  function instance(prototypeObject, isRequired = false) {
    if (isRequired) {
      return function required(value) {
        if (isUndefined(value)) return false;
        if (isObject(value)) return value instanceof prototypeObject;
        return false;
      };
    }

    return value => value instanceof prototypeObject;
  }


  /*
    Configurate is object
  */
  const is = {
    number: isNumber,
    string: isString,
    bool: isBoolean,
    undefined: isUndefined,
    nan: isNaN,
    null: isNull,
    array: isArray,
    object: isObject,
    finite: isFinite, // eslint-disable-line
    date: isDate,
    function: isFunction,
    empty: isEmpty,
    shape,
    instance,
  };


  /*
    Implementation of functions
    Временная заглушка
  // */
  is.array.of = {};
  Object.keys(is).forEach((property) => {
    is.array.of[property] = (array) => {
      if (!isArray(array)) return false;

      let isCorrect = true;
      array.forEach((value) => {
        if (!is[property](value)) isCorrect = false;
      });

      return isCorrect;
    };
  });


  /*
    Implementation of functions
  */
  is.array.oneOf = (...args) => {
    let arrayTypes;
    switch (true) {
      case isArray(args[0]):
        [arrayTypes] = args;
        break;

      case isString(args[0]) || isFunction(args[0]):
        arrayTypes = args;
        break;

      default:
        break;
    }

    return (array) => {
      let interfaceIsValid = true;

      array.forEach((value) => {
        let validValue = false;

        arrayTypes.forEach((type) => {
          switch (true) {
            case isString(type):
              if (is[type](value)) validValue = true;
              break;

            case isFunction(type):
              if (type(value)) validValue = true;
              break;

            default:
              throw TypeError('Not correct type parameter in oneOf construction');
          }
        });

        if (!validValue) interfaceIsValid = false;
      });

      return interfaceIsValid;
    };
  };


  /*
    Implementation required field
  */
  Object.keys(is).forEach((property) => {
    if (property === 'shape' || property === 'instance') {
      is[property].required = value => is[property](value, true);
    } else {
      is[property].required = function required(value) {
        if (isUndefined(value)) {
          // throw new Error(`${value} must be ${property}`);
          return false;
        }
        return is[property](value);
      };
    }
  });


  const Valli = {
    version: '0.0.1',
    is,
    validate: validateInterface,
  };


  /*
  Global variable define
  */
  if (!isUndefined(this)) {
    this.is = is;
    this.Valli = Valli;
  }

  return Valli;
});
