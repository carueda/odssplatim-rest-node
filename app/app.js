/*
 * The Platform Time Editor as a standalone app.
 */
var logger    = require('log4js').getLogger("app");
var express   = require('express');
var http      = require('http');
var mongoose  = require('mongoose');
var config    = require("./config");

//logger.debug("config = ", config);

var mongo = config.mongo;

logger.info("connecting");
mongoose.connect("mongodb://" +mongo.host + ":" + mongo.port + "/" + mongo.db, {
    user: mongo.user,
    pass: mongo.pw
});

var TokenModel    = require('./tokens/TokenModel')(mongoose);
var tokens        = require('./tokens')(TokenModel);

var PeriodModel   = require('./periods/PeriodModel')(mongoose);
var periods       = require('./periods')(PeriodModel);

var platformModel  = require('./platforms/platformModel')(mongoose);
var platforms      = require('./platforms')(platformModel);


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// allow CORS
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// setup routes:

app.get('/platforms',       platforms.findAll);
app.get('/tokens',          tokens.findAll);

app.get('/periods',          periods.findAll);
app.get('/periods/default',  periods.getDefault);
app.get('/periods/holidays', periods.getHolidays);



http.createServer(app).listen(app.get('port'), function(){
  logger.info('Express server listening on port ' + app.get('port'));
});
