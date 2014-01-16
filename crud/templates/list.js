angular.module('<%= appname %>').controller('<%= ctrlname %>',function($scope,  $routeParams, <%= _.camelize(name) %>){

 function reload() {
        <%= _.camelize(name) %>.query({type:$routeParams.type}, function (result) {
            $scope.items = result.Items;
        });

    }

    reload();
    $scope.delete = function(id) {
        <%= _.camelize(name) %>.delete({ id: id }, function () {
            reload();
        });
    };
});
