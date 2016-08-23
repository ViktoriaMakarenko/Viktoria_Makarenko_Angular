app.directive('datevalidation', function(){
	return {
		require: 'ngModel',
		link: function (scope, element, attrs, ctrl){
			ctrl.$validators.datevalidation = function (modelValue, viewValue){
				if (ctrl.$isEmpty(modelValue)){
					return true;
				}
				if (!moment(viewValue,'DD.MM.YYYY').isValid() || moment(viewValue,'DD.MM.YYYY').isAfter(moment()) || moment(viewValue,'DD.MM.YYYY').isBefore('01.01.1900','DD.MM.YYYY')){
					return false;
				}
				return true;
			}
		}
		
	};
});