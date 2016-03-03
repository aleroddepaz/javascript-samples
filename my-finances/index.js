var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var movements = [{concept : 'Supermarket', quantity : 50, category : 'Shopping', date : new Date}];
var categories = [{name : 'Shopping', date : new Date}];


app.get('/movements', function (req, res) {
  res.json(movements);
});

app.post('/movements', function (req, res) {
  var movement = req.body;
  movement.date = new Date;
  movement.quantity = parseInt(movement.quantity, 10);
  movements.push(movement);
  
  return res.json(movement);
});

app.get('/categories', function (req, res) {
  var result = categories.map(function(category) {
    var name = category.name;
    var date = category.date;
    
    var acc = movements.filter(function(m) {
      return m.category === name;
    }).map(function(m) {
      return m.quantity;
    }).reduce(function(x, y) {
      return x + y;
    }, 0);
    
    return {
      name : name,
      date : date,
      acc : acc
    };
  });
  res.json(result);
});

app.post('/categories', function (req, res) {
  var category = req.body;
  category.date = new Date;
  categories.push(category);
  
  return res.json(category);
});


app.listen(3000, function () {
  console.log('Webapp listening on port 3000!');
});