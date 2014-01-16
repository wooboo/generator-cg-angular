angular.module('<%= appname %>').controller('<%= ctrlname %>',function ($scope, $routeParams,  <%= _.camelize(name) %>) {

   function update(id) {
         <%= _.camelize(name) %>.get({ id: id }, function (item) {
            $scope.item = item;
        });
    }
    update($routeParams.id);
    $scope.save = function (form) {
        if (form.$valid) {
             <%= _.camelize(name) %>.update({ id: $routeParams.id }, $scope.item, function(result) {
                update(result.Id);
            });
        }
    };

});
