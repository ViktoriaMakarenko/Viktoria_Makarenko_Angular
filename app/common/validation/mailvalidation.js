app.directive('mailvalidation', function(){
	return {
		require: 'ngModel',
		link: function (scope, element, attrs, ctrl){
			ctrl.$validators.mailvalidation = function (modelValue, viewValue){
				if (ctrl.$isEmpty(modelValue)){
					return true;
				}
				if ((/^[\w-\.]+@[\w-]+\.[a-z]{2,3}$/i).test(viewValue)){
					return true;
				}
				return false;
			}
		}
		
	};
});