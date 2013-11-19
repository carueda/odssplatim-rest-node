/*
 * Controller for platforms.
 * Note: this module is only required for the standalone version of the timeline
 * editor (which was used for the initial prototyping of the editor).
 */

var logger = require('log4js').getLogger('platforms');
var mongoose = require('mongoose');

/**
 * Platform model -- verbatim schema copy from ODSS code.
 */
var Platform = mongoose.model('Platform', new mongoose.Schema({
    trackingDBID: {type: Number},
    name: {type: String},
    color: {type: String},
    abbreviation: {type: String},
    typeName: {type: String}
}, {
    collection: "platforms"
}));


module.exports = {
    findAll: function(req, res, next) {
        logger.debug("getting platforms:");
        Platform.find({}, function(err, docs) {
            if (err) {
                return next(err);
            }
            else {
                res.send(docs);
            }
        });
    }
};
