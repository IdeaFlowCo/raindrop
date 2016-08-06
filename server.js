var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT || 3000;

// Define the port to run on
app.set('port', port);

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/static/html/home.html'));
});

app.get('/tutorial', function (req, res) {
  res.sendFile(path.join(__dirname + '/static/html/tutorial.html'));
});


// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Server running. Open http://localhost:' + port);
});
