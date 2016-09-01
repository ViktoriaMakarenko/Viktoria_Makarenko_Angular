/**
 * Created by Makarenko on 25.08.2016.
 */
'use strict';
comboBoxApp.controller('ComboBoxCtrl', [ '$http', '$scope', function(http, $scope){

    var self = this;
    self.itemsList = [];
    self.page = 0;
    self.getItems = $scope.config.method;
    self.countOfItems = $scope.config.countOfItems;

    self.getMore = function () {
        self.getItems({info: {page: self.page, counts: self.countOfItems}})
            .then(function (res) {
                if (self.page == 0) {
                    self.itemsList = [];
                };
                for (var i = 0; i < res.data.newItems.length; i++) {
                    self.itemsList.push(res.data.newItems[i]);
                };
                if (res.data.endOfJson) {
                    self.noItems = true;
                };
                self.page++;
            });
    };


    self.chooseItem = function(item){
        $scope.model = item.name;
        self.showHide();
    };

    self.showHide = function () {
        self.isVisible = self.isVisible ? false : true;
    };

}]);