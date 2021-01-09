var express    = require('express');        
var app        = express();                 
var bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8080;        
var router = express.Router();
const MongoClient = require('mongodb').MongoClient
const mongo = require('mongodb');
const request = require('request');
var faker = require('faker');

var dbstring = "mongodb://localhost:27017/prueba";
var dbname = "prueba";

router.get('/', function(req, res) {
    res.send("Prueba enviame");
});

router.get('/trabajador', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	MongoClient.connect('mongodb://localhost:27017/prueba', (err, client) => {
	  	if (err) return console.error(err);
	  	console.log('Connected to Database');
		const db = client.db('prueba');
		db.collection('trabajador').find().toArray()
	    .then(results => {
	      res.send(results);
	    })
	    .catch(error => console.error(error))
	})
});

router.get('/trabajador/:id', function (req, res) {
  	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	var id = req.params.id;
  	console.log(id);
	MongoClient.connect('mongodb://localhost:27017/prueba', (err, client) => {
	  	if (err) return console.error(err);
	  	console.log('Connected to Database');
		const db = client.db('prueba');
		var oid = new mongo.ObjectID(id);
    	db.collection('trabajador').find({"_id":oid}).toArray()
	    .then(results => {
	      console.log(results);
	      res.send(results);
	    })
	    .catch(error => console.error(error))
	})
});

router.post('/trabajador/create', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	var nombre = req.body.name;
  	var apellido = req.body.lastname;
  	var cargo = req.body.position;
  	var email = req.body.email;
  	var dir = req.body.dir;
  	var tel = req.body.tel;
  	console.log(nombre);
  	console.log(apellido);
  	console.log(cargo);
  	MongoClient.connect('mongodb://localhost:27017/prueba', (err, client) => {
	  	if (err) return console.error(err);
	  	console.log('Connected to Database create');
		const db = client.db('prueba');
		db.collection('trabajador').insert({"name":nombre,"lastname":apellido,"position":cargo,"email":email,"direccion":dir,"telefono":tel}, function (err, result) {
			if(err != null) console.log(err);
			console.log(result);
		});
	});
  	res.send("Create OK");
});

router.post('/trabajador/createMany', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	var cant = parseInt(req.body.cant);
  	/*var nombre = req.body.name;
  	var apellido = req.body.lastname;
  	var cargo = req.body.position;*/
  	for(var i=0;i<cant;i++){
	  	let nombre = faker.name.firstName();
	  	let apellido = faker.name.lastName();
	  	let cargo = faker.name.jobTitle();
		let email = faker.internet.email();
	  	let dir = faker.address.streetName();
	  	let tel = faker.phone.phoneNumber();

	  	console.log(nombre);
	  	console.log(apellido);
	  	console.log(cargo);
	  	MongoClient.connect('mongodb://localhost:27017/prueba', (err, client) => {
		  	if (err) return console.error(err);
		  	console.log('Connected to Database create');
			const db = client.db('prueba');
			db.collection('trabajador').insert({"name":nombre,"lastname":apellido,"position":cargo,"email":email,"direccion":dir,"telefono":tel}, function (err, result) {
				if(err != null) console.log(err);
				console.log(result);
			});
		});
  	}
  	res.send("Create OK");
});

router.post('/trabajador/update/', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	var id = req.body.id;
  	var nombre = req.body.name;
  	var apellido = req.body.lastname;
  	var cargo = req.body.position;
  	var email = req.body.email;
  	var dir = req.body.dir;
  	var tel = req.body.tel;

  	MongoClient.connect('mongodb://localhost:27017/prueba', (err, client) => {
	  	if (err) return console.error(err);
	  	console.log('Connected to Database');
		const db = client.db('prueba');
		var oid = new mongo.ObjectID(id);
		db.collection('trabajador').update({'_id':oid}, {$set: {"name":nombre,"lastname":apellido,"position":cargo,"email":email,"direccion":dir,"telefono":tel}}, {w:1}, function(err, result){
    		console.log(result);
		});
	});
  	res.send("Update OK");

});

router.get('/trabajador/delete/:id', function (req, res) {
  	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	var id = req.params.id;
	MongoClient.connect('mongodb://localhost:27017/prueba', (err, client) => {
	  	if (err) return console.error(err);
	  	console.log('Connected to Database');
		const db = client.db('prueba');
		var oid = new mongo.ObjectID(id);
    	/*db.collection('news').deleteOne({_id:id})
	    .then(results => {
	      res.send(results);
	    })*/

	    db.collection("trabajador").deleteOne({_id:oid}, function(err, obj) {
			if (err) throw err;
			console.log("1 document deleted");
			res.send("document deleted");
		});
	    //.catch(error => console.error(error))
	})
});

app.use('/prueba', router);
app.listen(port);

console.log('Aplicación creada en el puerto: ' + port);