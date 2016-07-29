'use strict'
var form = angular.module('form',[]);

form.directive('string', function(){
	return {
		require: 'ngModel',
		link: function (scope, element, attrs, ctrl){
			ctrl.$validators.string = function (modelValue, viewValue){
				if (ctrl.$isEmpty(modelValue)){
					return true;
				}
				if ((/^[A-Z]{1}[a-z]{3,}$/).test(viewValue)){
					return true;
				}
				return false;
			}
		}
		
	};
});

form.directive('integer', function(){
	return {
		require: 'ngModel',
		link: function (scope, element, attrs, ctrl){
			ctrl.$validators.integer = function (modelValue, viewValue){
				if (ctrl.$isEmpty(modelValue)){
					return true;
				}
				if ((viewValue >= 18) && (viewValue <= 65)){
					return true;
				}
				return false;
			}
		}
		
	};
});

form.directive('date', function(){
	return {
		require: 'ngModel',
		link: function (scope, element, attrs, ctrl){
			ctrl.$validators.date = function (modelValue, viewValue){
				if (ctrl.$isEmpty(modelValue)){
					return true;
				}
				var day = +viewValue.slice(0,2);
				var month = +viewValue.slice(3,5);
				var year = +viewValue.slice(-4);
				console.log(day, month,year);
				if (day <= 0 || day> 31 || month <= 0 || month > 12 || year < 1900 || year > 2016){
					if (month == 2 && day > 28){
						if (!(year % 4) && day > 29){
							return false;
						}
						return false;
					}
					return false;
				}
				return true;
			}
		}
		
	};
});