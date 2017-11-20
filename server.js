require('dotenv').config()
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const database = require('./database');

const app = express();

//middleware
app.use(bodyParser());
app.use(cors());

//routes
require('./routes')(app);

//serve static assets in production
if (process.env.NODE_ENV !== 'development') {
  app.use(express.static(__dirname+'/client/build'));
}

//general error handling middleware
app.use((req,res,next) => {
	const err = new Error('Internal Server Error');
	err.status = 500;
	next(err);
});

//server
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`listening on port:${port}`));

//add default data
database.seed();

module.exports=app;

/*
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')

var app = new (require('express'))()
var port = 3000

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.get("/", function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
*/