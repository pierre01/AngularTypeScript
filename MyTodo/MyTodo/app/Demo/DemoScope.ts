module MyTodos.Demo {
    "use strict";

    export interface IDemoScope extends ng.IScope {
        count: number;
        inc: () => void;
        dec: () => void;
    }


} 