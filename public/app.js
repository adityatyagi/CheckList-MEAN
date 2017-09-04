// The Angular app
/*
We also create our functions to get all todos, create a todo, and delete a todo. 

All these will be hitting the API we just created. On page load, we will GET /api/todos and 
bind the JSON we receive from the API to $scope.todos. 

We will then loop over these in our view to make our todos.
*/

var scotchTodo = angular.module('scotchTodo', []);

function mainController($scope, $http) {

    // the add-bar will be empty at the start
    $scope.formData = {};

    // when landing on the page, get all todos and show them
    $http.get('/api/todos')
        .success(function(data) {
            $scope.todos = data; // $scope.todos will contain all the data from the database where todos will contain the list of todos
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    // on clicking the "Add" button, this .createTodo will be invoked
    $scope.createTodo = function() {
        $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data; // res.json(todos) from routes.js in Create Todo = data
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}