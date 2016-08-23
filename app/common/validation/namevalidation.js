app.directive('namevalidation', function(){
	return {
		require: 'ngModel',
		link: function (scope, element, attrs, ctrl){
			ctrl.$validators.namevalidation = function (modelValue, viewValue){
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