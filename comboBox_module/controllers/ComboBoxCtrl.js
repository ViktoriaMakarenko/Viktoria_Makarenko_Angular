/**
 * Created by Makarenko on 25.08.2016.
 */
'use strict';
comboBoxApp.controller('ComboBoxCtrl', [ '$http', '$scope', function(http, $scope){

    var self = this;
    $scope.itemsList = [];
    self.page = 0;
    self.countOfItems = 5;

    self.getItems = function (info){
        return http({
            method: 'post',
            url: '/getItems',
            data: info
        })};

    $scope.getMore = function () {
        self.getItems({info: {page: self.page, counts: self.countOfItems}})
            .then(function (res) {
                if (self.page == 0) {
                    $scope.itemsList = [];
                };
                for (var i = 0; i < res.data.newItems.length; i++) {
                    $scope.itemsList.push(res.data.newItems[i]);
                };
                if (res.data.endOfJson) {
                    $scope.noItems = true;
                };
                self.page++;
            });
    };

    $scope.chooseItem = function(item){
        $scope.selected = item.name;
        $scope.showHide();
    };

    $scope.showHide = function () {
        $scope.isVisible = $scope.isVisible ? false : true;
    };

}]);