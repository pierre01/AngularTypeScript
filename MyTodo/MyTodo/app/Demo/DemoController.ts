
module MyTodos.Demo {
    "use strict";

    export class DemoController {

        static $inject = ['$scope']; // For clean dependency injection in minimized JS and You can add more: ['$scope','$http'...]

        constructor($scope: IDemoScope) {
            $scope.count = 10;
            $scope.inc = () => {
                $scope.count++;
            }
            $scope.dec = () => {
                $scope.count--;
            }
        }

    }
}