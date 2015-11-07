'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var validate = require('jsonschema').validate;
var app = express();

app.use('/static', express.static(__dirname + '/client/static'));
app.use(bodyParser.json());

var data = [];

var todoSchema = {
  "title": "To-do Schema",
  "type": "object",
  "properties": {
    "id": {
      "type": "integer"
    },
    "text": {
      "type": "string"
    }
  },
  "required": ["text"],
  "additionalProperties": false
};

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

app.get('/todo', function(req, res) {
  res.json(data);
});

app.post('/todo', function(req, res) {
  var body = req.body;
  var errors = validate(body, todoSchema).errors;
  if(errors.length === 0) {
    data.push(body);
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

app.listen(3000);