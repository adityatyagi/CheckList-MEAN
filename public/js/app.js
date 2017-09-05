/*
we just have to load our controller and services, and then 
inject our controller and service into the main module.
*/

// scotchTodo will be injected in the index.html file in <html ng-app="scotchTodo">
angular.module('scotchTodo', ['todoController', 'todoService']);