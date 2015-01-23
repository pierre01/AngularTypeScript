module MyTodos.Navigation {
    "use strict";

    export class NavigationController {

        static $inject = ['$scope']; // For clean dependency injection in minimized JS and You can add more: ['$scope','$http'...]

        constructor($scope: INavigationScope) {
            $scope.radioModel = 'Left';
        }

    }
} 