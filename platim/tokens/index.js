/*
 * Controller for tokens.
 *
 * @author Carlos Rueda
 */

/**
 * Module dependencies
 */

var logger = require('log4js').getLogger('tokens');
var _ = require('underscore');
var mongoose = require('mongoose');
var Token = mongoose.model('Token');
var Platform = mongoose.model('Platform');

/**
 * Exposed operations
 * @class tokens
 */

module.exports = {
    findAll:        findAll,
    timelines:      timelines,
    timelineById:   timelineById,
    create:         create,
    update:         update,
    del:            del
};


/**
 * Gets all tokens.
 *
 * @method  findAll
 */
function findAll(req, res, next) {
    logger.debug("getting tokens:");
    Token.find({}, function(err, docs) {
        if (err) {
            return next(err);
        }
        else {
            res.send(docs);
        }
    });
}

/**
 * Gets the platforms having tokens associated.
 *
 * @method timelines
 */
function timelines(req, res, next) {
    logger.debug("getting timelines:");
    Token.find({}, function(err, docs) {
        if (err) {
            return next(err);
        }

        var platform_ids = _.map(docs, function(doc) {
            return doc.platform_id;
        });
        //logger.debug("timelines: platform_ids=", platform_ids);

        //Platform.findByIds(platform_ids, callback);
        logger.debug("getting platforms by given ids:");
        Platform.find({_id: { '$in': platform_ids}}, function(err, docs) {
            if (err) {
                return next(err);
            }
            else {
                res.send(docs);
            }
        });
    });
}

/**
 * Gets the tokens for the given platform.
 *
 * @method  timelineById
 */
function timelineById(req, res, next) {
    var platform_id = req.params.platform_id;
    logger.debug("getting tokens for platform_id=", platform_id);
    Token.find({platform_id: platform_id}, function(err, docs) {
        if (err) {
            return next(err);
        }
        else {
            res.send(docs);
        }
    });
}

/**
 * Creates a token.
 *
 * @method  create
 */
function create(req, res, next){
    var data = req.body;
    logger.debug("creating token:", data);
    Token.create(data, function(err, created) {
        if (err) {
            return next(err);
        }
        else {
            res.send(created);
        }
    });
}

/**
 * Updates a token.
 *
 * @method  update
 */
function update(req, res, next){
    var token_id = req.params.token_id;
    var data = req.body;
    logger.debug("updating token: token_id=", token_id, data);
    Token.findByIdAndUpdate(token_id, data, function(err, updated) {
        if (err) {
            return next(err);
        }
        else {
            res.send(updated);
        }
    });
}

/**
 * Deletes a token.
 *
 * @method  del
 */
function del(req, res, next){
    var token_id = req.params.token_id;
    logger.debug("deleting token: token_id=", token_id);
    Token.findByIdAndRemove(token_id, function(err) {
        if (err) {
            return next(err);
        }
        else {
            res.json({tokenDeleted: token_id});
        }
    });
}
