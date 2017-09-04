// Load the Todo model as we require it to create new todo
var Todo = require('./models/todo');

// expose the routes to our app with module.exports
module.exports = function(app) {

    // server api ====================================================

    // 1. get all todo
    app.get('/api/todos', function(req, res) {
        Todo.find(function(err, todos) {
            if (err) throw err;
            res.json(todos);
        });
    });

    // 2. create todo and send back all todos after creation
    app.post('/api/todos', function(req, res) {
        console.log('Creating Todo');

        // create a todo, information comes form AJAX request from Angular
        Todo.create({
            text: req.body.text,
            done: false
        }, function(err, todo) {
            if (err) throw err;

            // get all the todo after you create a new one
            Todo.find(function(err, todos) {
                if (err) throw err;
                res.json(todos);
            });
        });
    });

    // 3. Delete a todo
    app.delete('/api/todos/:todo_id', function(req, res) {
        console.log('Deleting todo');

        Todo.remove({
            _id: req.params.todo_id
        }, function(err, todo) {
            if (err) throw err;

            // get all the todos after you remove one
            Todo.find(function(err, todos) {
                if (err) throw err;
                res.json(todos);
            });
        });

    });


    // front-end CATCH-ALL api ========================================
    app.get('*', function(req, res) {
        res.sendFile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
}