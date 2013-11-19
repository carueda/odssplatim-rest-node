/*
 * Controller for periods.
 *
 * @author Carlos Rueda
 */

/**
 * Module dependencies
 */

var logger = require('log4js').getLogger('PeriodController');
var mongoose  = require('mongoose');
var Period = mongoose.model('Period');
var Holiday = mongoose.model('Holiday');
var DefaultPeriod = mongoose.model('DefaultPeriod');

/**
 * Exposed operations
 * @class periods
 */

module.exports = {
    findAll:        findAll,
    getDefault:     getDefault,
    getHolidays:    getHolidays,
    createPeriod:   createPeriod,
    deletePeriod:   deletePeriod
};


/**
 * Gets all periods.
 *
 * @method  findAll
 */
function findAll(req, res, next) {
    logger.debug("getting periods:");
    Period.find({'defaultPeriodId': {'$exists': false},
                 'holidays': {'$exists': false}
                }, function(err, docs) {
        if (err) {
            return next(err);
        }
        else {
            res.send(docs);
        }
    });
}

/**
 * Gets the default period.
 *
 * @method  getDefault
 */
function getDefault(req, res, next) {
    logger.debug("getting default period:");
    DefaultPeriod.findOne({'defaultPeriodId': {'$exists': true}}, function(err, docs) {
        if (err) {
            return next(err);
        }
        else {
            res.send(docs);
        }
    });
}

/**
 * Gets the holidays.
 *
 * @method  getHolidays
 */
function getHolidays(req, res, next) {
    logger.debug("getting holidays:");
    Holiday.findOne({'holidays': {'$exists': true}}, function(err, docs) {
        if (err) {
            logger.error("error getting holidays:", err);
        }
        if (err) {
            return next(err);
        }
        else {
            res.send(docs);
        }
    });
}

/**
 * Creates a period.
 *
 * @method  createPeriod
 */
function createPeriod(req, res, next) {
    var data = req.body;
    logger.debug("creating period:", data);
    Period.create(data, function(err, created) {
        if (err) {
            return next(err);
        }
        else {
            res.send(created);
        }
    });
}

/**
 * Deletes a period.
 *
 * @method  deletePeriod
 */
function deletePeriod(req, res, next) {
    var period_id = req.params.period_id;
    logger.debug("deleting period:", period_id);
    Period.findByIdAndRemove(period_id, function(err) {
        if (err) {
            return next(err);
        }
        else {
            res.json({periodDeleted: period_id});
        }
    });
}
