'use strict';
var app = angular.module('app',['ui.router','ngMaterial', 'ngAnimate', 'ngAria', 'pascalprecht.translate']);

app.config(function ($stateProvider, $urlRouterProvider, $translateProvider){
		
		$urlRouterProvider.otherwise('/login');

		$stateProvider
			.state('mainPage', {
				abstract: true,
				templateUrl: 'app/common/templates/header_footer_tpl.html',
				controllerAs: 'mainPage',
				controller: 'MainPageCtrl'
			})
			.state('login', {
				parent: 'mainPage',
				url: '/login',
				templateUrl: 'app/login/templates/login.html',
				controllerAs: 'login',
				controller: 'LoginCtrl'
			})
			.state('forgotPassword', {
				parent: 'mainPage',
				url: '/forgotPassword',
				templateUrl: 'app/login/templates/forgotPassword.html',
				controllerAs: 'forgotPassword',
				controller: 'ForgotPasswordCtrl'
			})
			.state('user', {
				parent: 'mainPage',
				url: '/userinfo',
				templateUrl: 'app/user/templates/user_info.html',
				controllerAs: 'userInfo',
				controller: 'UserCtrl',
				resolve: {
					initInfoService: function (infoService){
						return infoService.init();
					}
				}
			})
			.state('update-user-info', {
				parent: 'mainPage',
				url: '/userprofile',
				templateUrl: 'app/user/templates/form.html',
				controllerAs: 'userProfile',
				controller: 'UserProfileCtrl',
				resolve: {
					initInfoService: function (infoService){
						return infoService.init();
					}
				}
			});
			
		$translateProvider.useStaticFilesLoader({
			prefix: 'lang/lang-',
			suffix: '.json'
		});
		
		$translateProvider.useSanitizeValueStrategy('escaped');
		
		$translateProvider.preferredLanguage('en');
});
