var MyTodos;
(function (MyTodos) {
    (function (Demo) {
        "use strict";

        var DemoController = (function () {
            function DemoController($scope) {
                $scope.count = 10;
                $scope.inc = function () {
                    $scope.count++;
                };
                $scope.dec = function () {
                    $scope.count--;
                };
            }
            DemoController.$inject = ['$scope'];
            return DemoController;
        })();
        Demo.DemoController = DemoController;
    })(MyTodos.Demo || (MyTodos.Demo = {}));
    var Demo = MyTodos.Demo;
})(MyTodos || (MyTodos = {}));
var MyTodos;
(function (MyTodos) {
    (function (Demo) {
        "use strict";
    })(MyTodos.Demo || (MyTodos.Demo = {}));
    var Demo = MyTodos.Demo;
})(MyTodos || (MyTodos = {}));
var App;
(function (App) {
    "use strict";
    var AppBuilder = (function () {
        function AppBuilder(name) {
            this.app = angular.module(name, [
                "ngAnimate",
                "ngRoute",
                "ngSanitize",
                "ngResource",
                "ui.bootstrap"
            ]);

            this.app.controller("demoController", [
                "$scope", function ($scope) {
                    return new MyTodos.Demo.DemoController($scope);
                }
            ]);

            this.app.controller("todoController", [
                "$scope", "$http", function ($scope, $http) {
                    return new MyTodos.Todo.TodoController($scope, $http);
                }
            ]);

            this.app.controller("navigationController", [
                "$scope", function ($scope) {
                    return new MyTodos.Navigation.NavigationController($scope);
                }
            ]).directive("todoNavigation", function () {
                return {
                    restrict: "E",
                    templateUrl: "app/navigation/NavigationView.html"
                };
            });

            this.app.config([
                "$routeProvider",
                function ($routeProvider) {
                    $routeProvider.when("/demo", {
                        controller: "demoController",
                        controllerAs: "myController",
                        templateUrl: "app/demo/demoView.html"
                    }).when("/todo", {
                        controller: "todoController",
                        controllerAs: "myController",
                        templateUrl: "app/todo/todoView.html"
                    }).otherwise({
                        redirectTo: "/demo"
                    });
                }
            ]);

            this.app.run([
                "$route", function ($route) {
                    // Include $route to kick start the router.
                }
            ]);
        }
        AppBuilder.prototype.start = function () {
            var _this = this;
            $(document).ready(function () {
                console.log("booting " + _this.app.name);
                angular.bootstrap(document, [_this.app.name]);
            });
        };
        return AppBuilder;
    })();
    App.AppBuilder = AppBuilder;
})(App || (App = {}));
var MyTodos;
(function (MyTodos) {
    (function (Navigation) {
        "use strict";

        var NavigationController = (function () {
            function NavigationController($scope) {
                $scope.radioModel = 'Left';
            }
            NavigationController.$inject = ['$scope'];
            return NavigationController;
        })();
        Navigation.NavigationController = NavigationController;
    })(MyTodos.Navigation || (MyTodos.Navigation = {}));
    var Navigation = MyTodos.Navigation;
})(MyTodos || (MyTodos = {}));
var MyTodos;
(function (MyTodos) {
    (function (Navigation) {
        "use strict";
    })(MyTodos.Navigation || (MyTodos.Navigation = {}));
    var Navigation = MyTodos.Navigation;
})(MyTodos || (MyTodos = {}));
new App.AppBuilder('myTodo').start();
var MyTodos;
(function (MyTodos) {
    (function (Todo) {
        "use strict";

        var TodoController = (function () {
            function TodoController($scope, $http) {
                this.scope = $scope;
                this.http = $http;
                this.scope.vm = this;
                this.refresh();
            }
            TodoController.prototype.refresh = function () {
                var _this = this;
                this.http.get("http://localhost:49681/todos").success(function (data, status, headers, config) {
                    // Cast the response data into the right type
                    _this.scope.todos = data;
                }).error(function (data, status, headers, config) {
                    //called asynchronously if an error occurs or server returns response with an error status.
                    _this.scope.todos = null;
                });
            };

            TodoController.prototype.add = function () {
                var _this = this;
                var content = this.scope.newTodoText.trim();
                if (!content.length) {
                    return;
                }

                var newTodo = new Todo.TodoItem(0, 0, content, false);

                this.http.post("http://localhost:49681/todos", newTodo).success(function (data, status, headers, config) {
                    // Cast the response data into the right type
                    var todo = data;
                    _this.scope.todos.push(todo);
                    _this.scope.newTodoText = '';
                }).error(function (data, status, headers, config) {
                    //called asynchronously if an error occurs or server returns response with an error status.
                    _this.scope.todos = null;
                });
            };

            TodoController.prototype.update = function (item) {
                var _this = this;
                this.http.post("http://localhost:49681/todos", item).success(function (data, status, headers, config) {
                    // Cast the response data into the right type
                    var todo = data;
                    _this.scope.todos.push(todo);
                    _this.scope.newTodoText = '';
                }).error(function (data, status, headers, config) {
                    //called asynchronously if an error occurs or server returns response with an error status.
                    _this.scope.todos = null;
                });
            };

            TodoController.prototype.remove = function (todoItem) {
                this.scope.todos.splice(this.scope.todos.indexOf(todoItem), 1);
            };
            TodoController.$inject = ['$scope', '$http'];
            return TodoController;
        })();
        Todo.TodoController = TodoController;
    })(MyTodos.Todo || (MyTodos.Todo = {}));
    var Todo = MyTodos.Todo;
})(MyTodos || (MyTodos = {}));
var MyTodos;
(function (MyTodos) {
    (function (Todo) {
        "use strict";

        var TodoItem = (function () {
            function TodoItem(id, order, content, done) {
                this.id = id;
                this.order = order;
                this.content = content;
                this.done = done;
            }
            return TodoItem;
        })();
        Todo.TodoItem = TodoItem;
    })(MyTodos.Todo || (MyTodos.Todo = {}));
    var Todo = MyTodos.Todo;
})(MyTodos || (MyTodos = {}));
var MyTodos;
(function (MyTodos) {
    (function (Todo) {
        "use strict";
    })(MyTodos.Todo || (MyTodos.Todo = {}));
    var Todo = MyTodos.Todo;
})(MyTodos || (MyTodos = {}));
//# sourceMappingURL=app.js.map
