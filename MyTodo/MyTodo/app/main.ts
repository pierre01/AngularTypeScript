module App {
    "use strict";
    export class AppBuilder {

        app: ng.IModule;

        constructor(name: string) {
            this.app = angular.module(name, [
            // Angular modules 
                "ngAnimate",
                "ngRoute",
                "ngSanitize",
                "ngResource",
                "ui.bootstrap"
            ]);

            this.app.controller("demoController", [
                "$scope", ($scope: MyTodos.Demo.IDemoScope)
                    => new MyTodos.Demo.DemoController($scope)
            ]);

            this.app.controller("todoController", [
                "$scope","$http", ($scope: MyTodos.Todo.ITodoScope, $http: ng.IHttpService)
                    => new MyTodos.Todo.TodoController($scope,$http)
            ]);

            this.app.controller("navigationController", [
                "$scope", ($scope: MyTodos.Navigation.INavigationScope)
                    => new MyTodos.Navigation.NavigationController($scope)
            ])
            .directive("todoNavigation", () => {
                return {
                    restrict: "E",
                    templateUrl: "app/navigation/NavigationView.html"
                };
            });

            this.app.config([
                "$routeProvider",
                ($routeProvider: ng.route.IRouteProvider) => {
                    $routeProvider
                        .when("/demo",
                        {
                            controller: "demoController",
                            controllerAs: "myController",
                            templateUrl: "app/demo/demoView.html"
                        })
                        .when("/todo",
                        {
                            controller: "todoController",
                            controllerAs: "myController",
                            templateUrl: "app/todo/todoView.html"
                        })
                        .otherwise({
                            redirectTo: "/demo"
                        });
                }
            ]);

            this.app.run([
                "$route", $route => {
                    // Include $route to kick start the router.
                }
            ]);

        }


        public start() {
            $(document).ready(() => {
                console.log("booting " + this.app.name);
                angular.bootstrap(document, [this.app.name]);
            });
        }
    }
}


