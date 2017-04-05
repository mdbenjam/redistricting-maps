var express = require('express')
const path = require('path');
var app = express()

app.get('/data/virginia', function (req, res) {
  console.log('sending virginia');
  res.sendFile(path.join(__dirname, 'data', 'vaprecincts2016-5.json'));
});

app.get('/data/boston', function (req, res) {
  res.sendFile(path.join(__dirname, 'data', 'neighborhoods.json'));
});

app.get('/data/us', function (req, res) {
  res.sendFile(path.join(__dirname, 'data', 'us.json'));
});

app.get('/', function (req, res) {
  console.log('sending page');
  res.sendFile(path.join(__dirname, 'testmap.html'));
});

app.get('/styles.css', function (req, res) {
  console.log('sending styles');
  res.sendFile(path.join(__dirname, 'styles.css'));
});


app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
})