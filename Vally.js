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


    /*
    * Validate interface function
    */
    var validateInterface = function( options, interfaceOptions ) {
      var interfaceIsValid = true;

      for ( let key in options ) {
        var interfaceValidationFunction = interfaceOptions[ key ];
        var value = options[ key ]

        if ( !interfaceValidationFunction( value ) ) {
          interfaceIsValid = false;
        }
      }

      return interfaceIsValid;
    }


    var is = {
      number: isNumber,
      string: isString,
      bool: isBoolean,
      undefined: isUndefined,
      NaN: isNaN,
      array: isArray,
    }

    // прокидываем переменные в глабальные данные
    window.is = typeof window.is === 'undefined' ? is : console.warn('window.is reserved plese redefine Vally.is in new variable')
    window.Vally = {
      version: '0.0.1',
      is: is,
      validate: validateInterface;
    }
  })
})( window )