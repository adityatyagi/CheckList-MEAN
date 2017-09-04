// specifying the schema and developing the model for the todo
var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
    text: String,
    done: Boolean
});