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
  const isNumber = value => toString.call(value) === '[object Number]';
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


  function convertToText(value) {
    // create an array that will later be joined into a string.
    const string = [];

    switch (true) {
      case isObject(value) && !isArray(value): {
        string.push('{ ');
        const properties = Object.keys(value);
        properties.forEach(property => string.push(property, ': ', convertToText(value[property]), ', '));
        string.push('}');
        break;
      }

      case isArray(value): {
        string.push('[ ');
        const properties = Object.keys(value);
        properties.forEach(property => string.push(convertToText(value[property]), ', '));
        string.push(']');
        break;
      }

      case isFunction(value): {
        string.push('[Function]');
        break;
      }

      case isNaN(value): {
        string.push('NaN');
        break;
      }

      case isUndefined(value): {
        string.push('undefined');
        break;
      }

      default:
        string.push(JSON.stringify(value));
    }

    return string.join('');
  }


  /*
    checkTypes interface function
  */
  function checkTypes(objectInterface, object, isThrowError = false) {
    let isCorrect = true;

    const interfaceProps = Object.keys(objectInterface);

    interfaceProps.forEach((property) => {
      const checkTypeFunction = objectInterface[property];
      const value = object[property];

      if (!isFunction(checkTypeFunction)) {
        throw TypeError(`[valli.js]: interface for property ${property} not correct define.`);
      }


      if (property in object) {
        if (!checkTypeFunction(value)) {
          isCorrect = false;
          if (isThrowError) throw Error(`[valli.js]: property "${property}" in object: ${convertToText(object)} has not correct type`);
        }
      } else if (checkTypeFunction.name === 'required') {
        isCorrect = false;
        if (isThrowError) throw Error(`[valli.js]: property "${property}" in object: ${convertToText(object)} is required but not set`);
      } else {
        // not need activity
      }
    });

    return isCorrect;
  }


  function shape(shapeInterface, isThrowError = false, isRequired = false) {
    if (isRequired) {
      return function required(value) {
        if (!isObject(value)) return false;
        if (isObject(shapeInterface)) return checkTypes(shapeInterface, value, isThrowError);
        return false;
      };
    }

    return (value) => {
      if (isObject(shapeInterface)) {
        return checkTypes(shapeInterface, value, isThrowError);
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
    Implementation array of functions
  */
  is.array.of = {};
  const isValidArray = validationFunction => (array) => {
    if (!isArray(array)) return false;

    let isCorrect = true;
    array.forEach((value) => {
      if (!validationFunction(value)) isCorrect = false;
    });

    return isCorrect;
  };

  Object.keys(is).forEach((property) => {
    if (property === 'shape' || property === 'instance') {
      is.array.of[property] = objectInterface => isValidArray(is[property](objectInterface));
    } else {
      is.array.of[property] = isValidArray(is[property]);
    }
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
        // ! Вспомнить почему здесь нет действий по умолчанию
        break;
    }

    return (array) => {
      let isCorrect = true;

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

        if (!validValue) isCorrect = false;
      });

      return isCorrect;
    };
  };


  /*
    Implementation required field
  */
  Object.keys(is).forEach((property) => {
    if (property === 'shape' || property === 'instance') {
      is[property].required = value => is[property](value, false, true);
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


  /*
    Implementation not field
  */
  is.not = {};
  Object.keys(is).forEach((property) => {
    if (property === 'shape' || property === 'instance') {
      //! пока не понятно как должна проходить проверка в данном случае
      // is.not[property] = () => value => !is[property](value, false, false);
    } else {
      is.not[property] = value => !is[property](value);
    }
  });


  const valli = types => object => checkTypes(types, object);

  valli.version = '0.0.1';
  valli.valli = valli;
  valli.is = is;
  valli.checkTypes = checkTypes;

  /*
  Global variable define
  */
  if (!isUndefined(this)) {
    this.valli = valli;
  }

  return valli;
});
