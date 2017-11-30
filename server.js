
/************
 * Readme
 * First  -> You Need Install Node.js https://nodejs.org/en/
 * Second -> git clone git@github.com:gear20056/WebWorkshop-BUU-CS-2017.git
 * Third  -> npm install
 * Use This Command Run node.js -> node server.js
 * ************
 * This WebApplication For Contact List contactlist.html and contactlist-action.js
 * This Workshop For Webtechnology
 * This WebApplication Use Mongodb 
 * WebApplication Can Edit,Delete or Insert on Mogodb
 * Id:58660111,58660043,57160667
 ************/
/**************************************/
/************
 * Config Node.js
 ************/
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
 * Config Connect To -> Database Mongodb
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
			console.log("1 document inserted");
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
 * Edit Data -> Database Mongodb
 ************/
app.post('/editdata', function (req, res) {
	MongoClient.connect(url, function (err, db) {
		let myquery = {
			Telnumber: req.body.edit
		};
		let newvalues = {
			$set: {
				Name: req.body.nameedit,
				Surname: req.body.surnameedit
			}
		};
		db.collection("webtech").updateOne(myquery, newvalues, function (err, res) {
			console.log("1 document updated");
			db.close();
		});
	});
	res.send('success');
});

/************
 * Delete Data -> Database Mongodb
 ************/
app.post('/deletedata', function (req, res) {
	MongoClient.connect(url, function (err, db) {
		let myquery = {
			Telnumber: req.body.del
		};
		db.collection("webtech").deleteOne(myquery, function (err, obj) {
			console.log("1 document deleted");
			db.close();
		});
	});
	res.send('success');
});

/************
 * Run localhost -> local:3000
 ************/
app.listen(3000);
/************
 * End Webapplication Node.js
 ************/
