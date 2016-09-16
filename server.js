var jsxLoader = require('node-jsx').install({extension: '.jsx', harmony: true});
var express   = require('express');
var path      = require('path');
var jade      = require('jade');
var React     = require('react');
var ReactDOM  = require('react-dom/server');
var Home      = require('./pages/home.jsx');

var app = express();
var port = process.env.PORT || 3000;

var env = process.argv[2] || 'dev';
var production = false;
switch (env) {
  case 'prod': {
    production = true;
    break;
  }
}

var HomeFactory = React.createFactory(Home);

app.engine('jade', jade.__express);
app.set('view engine', 'jade');
app.set('port', port);

app.use(express.static(path.join(__dirname, 'static')));

app.get('/*', function (req, res) {
  res.render('page', {
    title: "IdeaFlow",
    react: production ? ReactDOM.renderToString(HomeFactory()) : ''
  });
});

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Server running. Open http://localhost:' + port);
});
