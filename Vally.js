(function( window ) {
  window.addEventListener('load', function () {

    var isNumber = function ( value ) {
      return toString.call( value ) === '[object Number]';
    }

    var validateInterface = function( options, interfaceOptions ) {
      var interfaceIsValid = true;

      for ( let key in options ) {
        if ( !interfaceOptions[ key ](options[ key ]) ) {
          interfaceIsValid = false;
        }
      }

      return interfaceIsValid;
    }


    var is = {
      number: isNumber;
      }
    }

    window.Vally = {
      version: '0.0.1',
      is: is,
      validate: validateInterface;
    }

  })
})( window )