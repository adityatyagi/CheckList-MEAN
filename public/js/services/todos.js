/*
The to-do service is meant to interact with our Node API. 
We want to have all the code to get, create, or delete a to-do inside our service. 
This ensures that we can test this code separate of our overall application.


We have defined our service using .factory with three different functions. get, create and delete will all
return "promise objects" that we can use in our controller.

Declaring Services 
There are many different ways to declare a service (.service, .factory and .provider). 
https://stackoverflow.com/questions/13937318/convert-angular-http-get-function-to-a-service
*/

angular.module('todoService', [])

// super simple service
// each function (get, create, delete) returns a promise object 
// this 'Todos' have to be injected in the controller so that the services and the controller works
.factory('Todos', function($http) {
    return {
        // Todos.get() in controller
        get: function() {
            return $http.get('/api/todos'); // returns a promise object
        },
        // Todos.create() in controller
        create: function(todoData) {
            return $http.post('/api/todos', todoData); // returns a promise object
        },
        // Todos.delete() in controller
        delete: function(id) {
            return $http.delete('/api/todos/' + id); // returns a promise object
        }
    }
});