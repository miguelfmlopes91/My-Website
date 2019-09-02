var bodyParser = require('body-parser');
const MongoClient = require('mongoose');

//Prepare url for connection
const uri = "mongodb+srv://test:test@todo-itvro.mongodb.net/test?retryWrites=true&w=majority";

//connect to the database
MongoClient.connect(uri, { useNewUrlParser: true });

//Create a schema
var todoSchema = new MongoClient.Schema({
    item: String
});
//The Model type
var Todo = MongoClient.model('Todo', todoSchema);

//var data = [{item: "Get Milk"},{item: "Get rich"},{item: "Kick some ass"}]
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {
    app.get('/todo', (req, res) => {
        //get data from mongodb and pass it to the view
        Todo.find({}, (err, data) => {
            if (err) throw err;
        });//retrieve all of the items from a collection
        res.render('todo', {todos: data});
    })
    app.post('/todo', urlencodedParser, (req, res) => {
        //get data from the view and add it to mongodb
        var newTodo = Todo(req.body).save((err, data) => {
            if (err) throw err;
            res.json(data);
        })
    })
    app.delete('/todo/:item', (req, res) => {
        //delete the requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove((err, data) => {
            if (err) throw err;
            res.json(data);
        })
    })
}