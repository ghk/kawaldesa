angular.module('ng-inputdecimalseparator', [])
    .directive('inputDecimalSeparator', [
    '$locale',
    function ($locale, undefined) {
        return {
            restrict: 'A',
            require: '?ngModel',
            compile: function (_element, tAttrs) {
                return function (scope, element, attrs, ctrl, undefined) {
                    if (!ctrl) {
                        return;
                    }
                    
					 var decimalDelimiter = $locale.NUMBER_FORMATS.DECIMAL_SEP,
                            thousandsDelimiter = $locale.NUMBER_FORMATS.GROUP_SEP,
                            defaultDelimiter=".";
					var decimalMax=isNaN(attrs.decimalMax)?null:parseFloat(attrs.decimalMax);
					var decimalMin=isNaN(attrs.decimalMin)?null:parseFloat(attrs.decimalMin);
					var noOfDecimal=null;
					
					if (noOfDecimal || noOfDecimal != '')
					{
						noOfDecimal= isNaN(attrs.inputDecimalSeparator)?2:Number(attrs.inputDecimalSeparator);
						noOfDecimal=Math.floor(noOfDecimal);
					}
						
					// Parser starts here...
                    ctrl.$parsers.push(function (value) {
                        if (!value || value === '') {
                            return null;
                        }
						
                        var str = "[^0-9" + decimalDelimiter + "]";
						var regularExpression = new RegExp(str, 'g');

                        var outputValue = value.replace(regularExpression, '');

                        var tokens = outputValue.split(decimalDelimiter);
                        tokens.splice(2, tokens.length - 2);

                        if (noOfDecimal && tokens[1])
                            tokens[1] = tokens[1].substring(0, noOfDecimal);

                        var result = tokens.join(decimalDelimiter);
                        var actualNumber =tokens.join(defaultDelimiter);

                        ctrl.$setValidity('max', true);
                        ctrl.$setValidity('min', true);
						
                        if (decimalMax && Number(actualNumber) > decimalMax)
                            ctrl.$setValidity('max', false);

                        if (decimalMin && Number(actualNumber) < decimalMin)
                            ctrl.$setValidity('min', false);

						 // apply thousand separator
                        if (result) {
                            tokens = result.split($locale.NUMBER_FORMATS.DECIMAL_SEP);
                            if (tokens[0])
                                tokens[0] = tokens[0].split( /(?=(?:...)*$)/ ).join($locale.NUMBER_FORMATS.GROUP_SEP);

                            result = tokens.join($locale.NUMBER_FORMATS.DECIMAL_SEP);
                        }
						
                        if (result != value) {
                            ctrl.$setViewValue(result);
                            ctrl.$render();
                        }

                        return actualNumber;

                    }); // end Parser

					// Formatter starts here
                    ctrl.$formatters.push(function (value) {

                        if (!value || value === '') {
                            return null;
                        }

                        value = value.toString();

                        var tokens = value.split(defaultDelimiter);
                        tokens.splice(2, tokens.length - 2);

                        if (noOfDecimal && tokens[1])
                            tokens[1] = tokens[1].substring(0, noOfDecimal);

                        var result = tokens.join(decimalDelimiter);
						var actualNumber =Number(tokens.join(defaultDelimiter));
						
						if (decimalMax && actualNumber > decimalMax)
                            ctrl.$setValidity('max', false);

                        if (decimalMin && actualNumber < decimalMin)
                            ctrl.$setValidity('min', false);
						
						 // apply thousand separator
                        if (result) {
                            tokens = result.split($locale.NUMBER_FORMATS.DECIMAL_SEP);
                            if (tokens[0])
                                tokens[0] = tokens[0].split( /(?=(?:...)*$)/ ).join($locale.NUMBER_FORMATS.GROUP_SEP);

                            result = tokens.join($locale.NUMBER_FORMATS.DECIMAL_SEP);
                        }
                        return result;
                    });
                };  // end link function
            } // end compile function
        };
    }
]);
