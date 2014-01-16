angular.module('<%= appname %>').controller('<%= ctrlname %>',function($scope, $routeParams, <%= _.camelize(name) %>){

    $scope.item = { };

    $scope.save = function (form) {
        if (form.$valid) {
            <%= _.camelize(name) %>.create($scope.item, function () {
                $scope.$back();
            });
        } else {

        }
    };

});
