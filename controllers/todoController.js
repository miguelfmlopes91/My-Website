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

//test
var item1 =  Todo({item: 'Buy flowers'}).save((error) => {
    if(error) throw error;
    console.log("Item saved");
    
});

var data = [{item: "Get Milk"},{item: "Get rich"},{item: "Kick some ass"}]
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {
    app.get('/todo', (req, res) => {
        res.render('todo',{todos: data});
    })
    app.post('/todo', urlencodedParser, (req, res) => {
        data.push(req.body);
        res.json(data);
    })
    app.delete('/todo/:item', (req, res) => {
        data = data.filter((todo) => {
            return todo.item.replace(/ /g, '-') !== req.params.item;
        });
        res.json(data);
    })
}