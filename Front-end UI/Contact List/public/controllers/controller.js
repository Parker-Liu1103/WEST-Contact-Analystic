function AppCtrl($scope, $http) {
    console.log("Hellow World From Controller");
    var refresh = function() {
        $http.get('/contactlist').success(function(response) {
            console.log("I got the data I requested");
            $scope.contactlist = response;
            $scope.contact = "";
        });
    }
   refresh();
    $scope.addContact = function() {
        console.log($scope.contact);
        $http.post('/contactlist', $scope.contact).success(function(response) {
            // console.log("----");
            console.log(response);
            refresh();
        });
    };
    $scope.remove = function(id) {
        console.log(id);
        $http.delete('/contactlist/' + id).success(function(response) {
            refresh();
        })

    };
    $scope.edit = function(id) {
        console.log(id);
        $http.get('/contactlist/' + id).success(function(response) {
            // refresh();
            $scope.contact = response;
        })
    }
    $scope.update = function() {
        console.log($scope.contact._id);
        $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {
            refresh();
        })
        
    }
    $scope.deselect = function (){
        $scope.contact = "";
    }


}
