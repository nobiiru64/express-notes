const express        = require('express');
const http          = require('http');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const app            = express();


app.use(express.static(__dirname + '/public'));

const port = 8000;
app.use(bodyParser.urlencoded({ extended: true }));
MongoClient.connect(db.url,{useNewUrlParser: true}, (err, database) => {
  if (err) return process.exit(1)

  var db = database.db('nodesapi');

  require('./app/routes')(app, db);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });

})
