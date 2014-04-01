// set up
var express = require('express');
var app = express();
var mongoose = require('mongoose');

// configuration
//development
mongoose.connect('mongodb://localhost/test');


//connection test
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('db connected');
});


app.configure(function(){
	app.use(express.static(__dirname + '/public'));
	app.use(express.logger('dev'));
	app.use(express.urlencoded());
	app.use(express.json());
});

//model ============
	var Todo = mongoose.model('Todo',{
		text: String
	});


//routes ===========
//api

	//get all todos
	app.get('/api/todos', function(req, res){
		//use mongoose to read db
		Todo.find(function(err,todos){
			//if error response error and break
			if(err)
				res.send(err)
			//response is all todos in JSON format
			res.json(todos);
		});
	});
	
	//create a todo and send al todos after creation
	app.post('/api/todos', function(req, res){
		//crate a TODO from an AJAX request from Angular
		Todo.create({
			text: req.body.text,
			done: false
		}, function(err, todos){
			if(err)
				res.send(err);
			//get and return updated list	
			Todo.find(function(err, todos){
				if(err)
					res.send(err)
				res.json(todos);
			});
		});
	});
	
	//delete a todo
	app.delete('/api/todos/:todo_id', function(req, res){
		Todo.remove({
			_id: req.params.todo_id
			}, function(err, todo){
				if(err)
					res.send(err);
				//get and return updated list	
				Todo.find(function(err, todos){
					if(err)
						res.send(err);
					res.json(todos);
			});
		});
	});
	
	//does update method exists?
	
	//application
	app.get('*', function(){
		res.sendfile('./public/index.html');
		//load the single view file (angular will handle states)
	});
	

//listen port
app.listen(8080);
console.log('App listen on port 8080');

