var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//Connect to the database
mongoose.connect('mongodb://julia:test@ds151951.mlab.com:51951/todolist')

var todoSchema = new mongoose.Schema({
  item: String,
});

var categorySchema = new mongoose.Schema({
  title: String,
  todoList: [todoSchema],
});

var Category = mongoose.model('Category', categorySchema);
var itemNew = Category({
  title: 'work',
  todoList: [{finish urgent task}],
}).save(function(err){
  if (err) throw err;
  console.log('item saved');
})

/*var itemNew = Todo({item: 'task1'}).save(function(err){
  if (err) throw err;
  console.log('item saved');
});*/

//var data = [{item:"walk the dog"},{item:"buy cake"},{item:"study hard"}];
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){
  app.get('/todoList', function(req, res){
    Todo.find({}, function(err, data){
      if(err) throw err;
      res.render('todoList', {todos: data});
    });
  });
  app.get('/', function(req, res){
    res.render('categories');
  });
  app.post('/todoList', urlencodedParser, function(req, res){
    Todo(req.body).save(function(err, data){
        if(err) throw err;
        res.json(data);
    });
  });
  app.post('/todoList/:item', urlencodedParser, function(req, res){
      var newName = Todo(req.body);
      console.log(req.params.item);
      console.log(newName.item);
    Todo.findOneAndUpdate({item: req.params.item.replace(/-/g,' ')}, {item: newName.item}, {upsert:true}, function(err, data){
        if(err) throw err;
        res.json(data);
      });
  });
  app.delete('/todoList/:item', function(req, res){
    Todo.find({item: req.params.item.replace(/-/g,' ')}).remove(function(err, data){
      if(err) throw err;
      res.json(data);
    });
  });
};
