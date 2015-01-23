module MyTodos.Todo {
    "use strict";

    export class TodoItem {
        constructor(
            public id: number,
            public order:number,
            public content: string,
            public done: boolean
        ) {}
    }
}