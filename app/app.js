/*
 * The Platform Time Editor backend REST service as a standalone app.
 * This app was mainly used during initial prototyping of the editor.
 *
 * Note: Platform related definitions below (model and route) are only
 * required for this standalone app.
 *
 * @author Carlos Rueda
 */

/**
 * Module dependencies
 */

var logger    = require('log4js').getLogger("odssplatim");
var express   = require('express');
var http      = require('http');
var mongoose  = require('mongoose');
var mongoCfg  = require("./config").mongo;

// connect mongoose to the database:
logger.debug("connecting:", mongoCfg.uri);
mongoose.connect(mongoCfg.uri, mongoCfg.options);
logger.info("connected", mongoCfg.uri);

// Platform model -- verbatim schema copy from ODSS code.
var Platform = mongoose.model('Platform', new mongoose.Schema({
    trackingDBID: {type: Number},
    name: {type: String},
    color: {type: String},
    abbreviation: {type: String},
    typeName: {type: String}
}));

// platform timeline models:
require('./periods/models');
require('./tokens/models');

// platform timeline controllers:
var periods  = require('./periods');
var tokens   = require('./tokens');

// set up application:

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

app.get('/periods',                   periods.findAll);
app.get('/periods/default',           periods.getDefault);
app.get('/periods/holidays',          periods.getHolidays);
app.post('/periods',                  periods.createPeriod);
app.del('/periods/:period_id',        periods.deletePeriod);

app.get('/platforms', function(req, res, next) {
    logger.debug("getting platforms:");
    Platform.find({}, function(err, docs) {
        if (err) {
            return next(err);
        }
        else {
            res.send(docs);
        }
    });
});


http.createServer(app).listen(app.get('port'), function(){
  logger.info('Express server listening on port ' + app.get('port'));
});
