/**
 * Created by Makarenko on 25.08.2016.
 */
'use strict';
app.controller('ComboCtrl', ['$http', '$scope', function(http, $scope){

    var self = this;

    self.countOfItems = 5;

    self.getItems = function (info){
        return http({
            method: 'post',
            url: '/getItems',
            data: info
        })};

    self.config = {
        countOfItems: self.countOfItems,
        method: self.getItems
    };

    self.model = 'There will be selected item';
}]);