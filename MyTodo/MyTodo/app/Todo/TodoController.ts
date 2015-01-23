module MyTodos.Todo {
    "use strict";

    export class TodoController {

        private http: ng.IHttpService;
        private scope: ITodoScope;

        static $inject = ['$scope','$http']; // For clean dependency injection in minimized JS and You can add more: ['$scope','$http'...]
        constructor($scope: ITodoScope, $http: ng.IHttpService) {
            this.scope = $scope;
            this.http = $http;
            this.scope.vm = this;
            this.refresh();

        }

        
        refresh() {


            this.http.get("http://localhost:49681/todos").
                success((data, status, headers, config) => {
                    // Cast the response data into the right type
                    this.scope.todos = <TodoItem[]> data;
                }).
                error((data, status, headers, config) => {
                //called asynchronously if an error occurs or server returns response with an error status.
                this.scope.todos = null;
            });
        }

        add() {

            var content: string = this.scope.newTodoText.trim();
            if (!content.length) {
                return;
            }

            var newTodo: TodoItem = new TodoItem(0, 0, content, false);

            this.http.post("http://localhost:49681/todos", newTodo).
                success((data, status, headers, config) => {
                    // Cast the response data into the right type
                     
                    var todo:TodoItem = <TodoItem> data;
                    this.scope.todos.push(todo);
                    this.scope.newTodoText = '';

                }).
                error((data, status, headers, config) => {
                    //called asynchronously if an error occurs or server returns response with an error status.
                    this.scope.todos = null;
                });


        }

        update(item: TodoItem) {

            this.http.post("http://localhost:49681/todos", item).
                success((data, status, headers, config) => {
                    // Cast the response data into the right type

                    var todo: TodoItem = <TodoItem> data;
                    this.scope.todos.push(todo);
                    this.scope.newTodoText = '';

                }).
                error((data, status, headers, config) => {
                    //called asynchronously if an error occurs or server returns response with an error status.
                    this.scope.todos = null;
                });

        }

        remove(todoItem: TodoItem) {

            this.scope.todos.splice(this.scope.todos.indexOf(todoItem), 1);
        }


    }
} 