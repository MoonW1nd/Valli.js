(function( window ) {
  window.addEventListener('load', function () {


    /*
    * Check types functions
    */
    var isNumber = function ( value ) {
      return toString.call( value ) === '[object Number]';
    }

    var isString = function ( value ) {
      return toString.call( value ) === '[object String]';
    }

    var isBoolean = function ( value ) {
      return toString.call( value ) === '[object Boolean]';
    }

    var isUndefined = function ( value ) {
      return toString.call( value ) === '[object Undefined]';
    }

    var isArray = function ( value ) {
      return toString.call( value ) === '[object Array]';
    }

    var isObject = function ( value ) {
      return toString.call( value ) === '[object Object]';
    }


    /*
      Implementation requred field
    */
    isObject.required = function (value) {
      if ( isUndefined( value ) ) {
        throw new Error('filde requre by defined')
      } else {
        return isObject( value )
      }
    }


    /*
    * Validate interface function
    */
    var validateInterface = function( options, interfaceOptions ) {
      var interfaceIsValid = true;

      for ( let key in interfaceOptions ) {
        var interfaceValidationFunction = interfaceOptions[ key ];
        var value = options[ key ]

        if ( !interfaceValidationFunction( value ) ) {
          interfaceIsValid = false;
        }

      }

      return interfaceIsValid;
    }


    /*
      Configurate is object
    */
    var is = {
      number: isNumber,
      string: isString,
      bool: isBoolean,
      undefined: isUndefined,
      NaN: isNaN,
      array: isArray,
      object: isObject,
      finite: isFinite
    }


    /*
      Global variable define
    */
    window.is = typeof window.is === 'undefined' ? is : console.warn('window.is reserved plese redefine Vally.is in new variable')
    window.Valli = {
      version: '0.0.1',
      is: is,
      validate: validateInterface,
    }
  })
})( window )