((root, libraryModule) => {
  if (typeof exports === 'object') {
    // Node for Jest testing
    module.exports = libraryModule();
  } else {
    // Browser globals (root is self)
    libraryModule();
  }
})(this, () => {
  /*
  *  Check types functions
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


  /*
  *  Implementation requred field
  */
  isObject.required = (value) => {
    if (isUndefined(value)) {
      throw new Error('filde requre by defined');
    } else {
      return isObject(value);
    }
  };


  /*
    * Validate interface function
    */
  const validateInterface = (options, optionsInterface) => {
    let interfaceIsValid = true;

    const interfaceProps = optionsInterface.keys();

    interfaceProps.forEach((property) => {
      const interfaceValidationFunction = optionsInterface[property];
      const value = options[property];

      if (!interfaceValidationFunction(value)) {
        interfaceIsValid = false;
      }
    });

    return interfaceIsValid;
  };


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
  };

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
  // is.function = isFunction;

  // this.Valli = Valli;

  return Valli;
});
