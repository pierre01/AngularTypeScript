module MyTodos.Todo {
    "use strict";

    export interface ITodoScope extends ng.IScope {
        todos: TodoItem[];
        newTodoText :string;
        vm: TodoController;
    }

} 