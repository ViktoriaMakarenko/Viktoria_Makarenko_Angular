/**
 * Created by Makarenko on 25.08.2016.
 */
'use strict';
comboBoxApp.directive('comboBox', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'comboBox_module/templates/comboBox_tpl.html',
        scope: {model: '='},
        controllerAs: 'comboBox',
        controller: 'ComboBoxCtrl'
    };
});