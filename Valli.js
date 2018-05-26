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

    // if (!isUndefined(options) && !isEmpty(options)) {
    const interfaceProps = Object.keys(optionsInterface);

    interfaceProps.forEach((property) => {
      const interfaceValidationFunction = optionsInterface[property];
      const value = options[property];

      if (!isFunction(interfaceValidationFunction)) {
        throw TypeError(`[Valli.js]: interface for property ${property} not correct define.`);
      }

      // console.log(interfaceValidationFunction.name);
      if (property in options || interfaceValidationFunction.name === 'required') {
        if (!interfaceValidationFunction(value)) interfaceIsValid = false;
      }
    });
    // }

    return interfaceIsValid;
  }


  function shape(shapeInterface, isRequred = false) {
    return (value) => {
      if (isRequred && !isObject(value)) return false;

      if (isObject(shapeInterface)) {
        return validateInterface(value, shapeInterface);
      }
      return false;
    };
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
  };


  /*
    Implementation of functions
    Временная заглушка
  */
  is.array.of = {
    numbers: isNumber,
  };


  /*
    Implementation of functions
  */
  is.array.oneOf = arrayTypes => (array) => {
    let interfaceIsValid = true;

    array.forEach((value) => {
      arrayTypes.forEach((type) => {
        if (!is[type](value)) interfaceIsValid = false;
      });
    });

    return interfaceIsValid;
  };


  /*
    Implementation requred field
  */
  Object.keys(is).forEach((property) => {
    if (property === 'shape') {
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
