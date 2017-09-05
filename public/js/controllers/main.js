angular.module('todoController', [])

// inject the 'Todos' service factory into our controller
.controller('mainController', function($scope, $http, Todos) {
    $scope.formData = {};

    // GET =====================================================================
    // when landing on the page, get all todos and show them
    // use the service to get all the todos
    Todos.get()
        .success(function(data) {
            $scope.todos = data;
        })
        .error(function(data) {
            console.log('Error ' + data);
        });

    // CREATE ==================================================================
    // when submitting the add form, send the text to the node API
    // on clicking the "Add" button, .createTodo() is invoked
    $scope.createTodo = function() {

        // validate the formData to make sure that something is there
        // if form is empty, nothing will happen
        // user can't just hold enter to keep adding the same to-do
        if (!$.isEmptyObject($scope.formData)) {

            // call the create function from our service (returns a promise object)
            Todos.create($scope.formData)

            // if successful creation, call our get function to get all the new todos
            // calling .success() on the promise object
            .success(function(data) {
                    $scope.formData = {}; // clear the form so our user is ready to enter another
                    $scope.todos = data; // assign our new list of todos
                })
                .error(function(data) {
                    console.log('Error ' + data);
                });
        }
    };

    // DELETE ==================================================================
    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        Todos.delete(id)
            // if successful creation, call our get function to get all the new todos
            .success(function(data) {
                $scope.todos = data; // assign our new list of todos
            })
            .error(function(data) {
                console.log('Error ' + data);
            });
    };
});