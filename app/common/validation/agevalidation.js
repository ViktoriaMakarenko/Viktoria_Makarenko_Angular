app.directive('agevalidation', function(){
	return {
		require: 'ngModel',
		link: function (scope, element, attrs, ctrl){
			ctrl.$validators.agevalidation = function (modelValue, viewValue){
				if (ctrl.$isEmpty(modelValue)){
					return true;
				}
				if (/^[0-9]{2}$/.test(viewValue) && (viewValue >= 18) && (viewValue <= 65)){
					return true;
				}
				return false;
			}
		}
		
	};
});