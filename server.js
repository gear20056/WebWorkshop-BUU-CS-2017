const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const app = express();

app.use(bodyParser.json());
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

/************
 * Connect -> Database Mongodb
 ************/
const MongoClient = require('mongodb').MongoClient,
f = require('util').format,
assert = require('assert');

var user = encodeURIComponent('ian');
var password = encodeURIComponent('secretPassword');
var authMechanism = 'DEFAULT';

var url = f('mongodb://%s:%s@188.166.185.154:27017/cool_db?authMechanism=%s',
user, password, authMechanism);

/************
 * Insert Data -> Database Mongodb
 ************/
app.post('/insertdata', function (req, res) {
	MongoClient.connect(url, function (err, db) {
		let myobj = {
			Name: req.body.name,
			Surname: req.body.surname,
			Telnumber: req.body.telnum,
			Email: req.body.email
		};
		db.collection("webtech").insertOne(myobj, function (err, res) {
			console.log("document inserted");
			db.close();
		});
	});
	res.send('success');
});
/************
 * Find Data -> Database Mongodb
 ************/
app.post('/showdata', function (req, res) {
	MongoClient.connect(url, function (err, db) {
		if (err) throw err;
		db.collection("webtech").find({}).toArray(function (err, results) {
			let obj = [];
			for (var i in results) {
				obj[i] = results[i];
			}
			console.log('Show data');			
			console.log(results);
			db.close();
			res.send(obj);
		});
	});
});

/************
 * Run localhost -> local:3000
 ************/
app.listen(3000);
