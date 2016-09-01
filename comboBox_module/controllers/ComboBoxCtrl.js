/**
 * Created by Makarenko on 25.08.2016.
 */
'use strict';
comboBoxApp.controller('ComboBoxCtrl', [ '$http', '$scope', function(http, $scope){

    var self = this;

    self.itemsList = [];
    self.getItems = $scope.config.method;
    self.countOfItems = $scope.config.countOfItems;

    self.getMore = function () {
        self.getItems({info: {counts: self.countOfItems, filter: $scope.textForFilter, start: self.start}})
            .then(function (res) {
                if (self.start == 0) {
                    self.itemsList = [];
                };
                self.start = res.data.start;
                for (var i = 0; i < res.data.newItems.length; i++) {
                    self.itemsList.push(res.data.newItems[i]);
                };
                self.noItems = res.data.endOfJson;
            });
    };

    self.chooseItem = function(item){
        $scope.model = item.name;
        self.showHide();
    };

    self.showHide = function () {
        self.isVisible = self.isVisible ? false : true;
    };

    $scope.$watch('textForFilter', function() {
            self.start = 0;
            self.getMore();
    });

}]);