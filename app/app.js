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

// the following for platforms, only needed in this standalone app
var PlatformModel  = require('./platforms/PlatformModel')(mongoose);
var platforms      = require('./platforms')(PlatformModel);
//-

var TokenModel    = require('./tokens/TokenModel')(mongoose, PlatformModel);
var tokens        = require('./tokens')(TokenModel);

var PeriodModel   = require('./periods/PeriodModel')(mongoose);
var periods       = require('./periods')(PeriodModel);


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
  res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  next();
});

// setup routes:
app.get('/tokens',                    tokens.findAll);
app.get('/timelines',                 tokens.timelines);
app.get('/timelines/:platform_id',    tokens.timelineById);
app.post('/tokens',                   tokens.create);
app.put('/tokens/:token_id',          tokens.update);
app.del('/tokens/:token_id',          tokens.del);

app.get('/periods',          periods.findAll);
app.get('/periods/default',  periods.getDefault);
app.get('/periods/holidays', periods.getHolidays);
app.post('/periods',         periods.createPeriod);

// the following for platforms only needed in this standalone app
app.get('/platforms',  platforms.findAll);


http.createServer(app).listen(app.get('port'), function(){
  logger.info('Express server listening on port ' + app.get('port'));
});
