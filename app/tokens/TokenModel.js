var logger = require('log4js').getLogger('TokenModel');
var _      = require('underscore');

module.exports = TokenModel;

function TokenModel(mongoose, PlatformModel) {
    var model = mongoose.model('Token', new mongoose.Schema({
        platform_id:  String,
        start:        String,
        end:          String,
        state:        String,
        description:  String
    }, {
        collection: "timeline_tokens"
    }));

    /** get all tokens */
    var findAll = function(callback) {
        logger.debug("getting tokens:");
        model.find({}, function(err, docs) {
            if (err) {
                logger.error("error getting tokens:", err);
            }
            callback(err, docs)
        });
    };

    /** get platforms having tokens associated */
    var timelines = function(callback) {
        logger.debug("getting timelines:");
        model.find({}, function(err, docs) {
            if (err) {
                logger.error("error getting tokens:", err);
                return;
            }

            //logger.debug("timelines: tokens=", docs);

            var platform_ids = _.map(docs, function(doc) {
                return doc.platform_id;
            });
            logger.debug("timelines: platform_ids=", platform_ids);

            PlatformModel.findByIds(platform_ids, callback);
        });
    };

    /** get tokens for the given platform */
    var timelineById = function(platform_id, callback) {
        logger.debug("getting tokens for platform_id=", platform_id);
        model.find({platform_id: platform_id}, function(err, docs) {
            if (err) {
                logger.error("error getting tokens:", err);
                return;
            }
            callback(err, docs);
        });
    };

    /** create token */
    var create = function(data, callback) {
        logger.debug("creating token:", data);
        model.create(data, function(err, created) {
            if (err) {
                logger.error("error creating token:", err);
            }
            callback(err, created)
        });
    };

    /** update token */
    var update = function(token_id, data, callback) {
        logger.debug("updating token: token_id=", token_id, data);
        model.findByIdAndUpdate(token_id, data, function(err, updated) {
            if (err) {
                logger.error("error updating token:", err);
            }
            callback(err, updated)
        });
    };

    return {
        findAll:        findAll,
        timelines:      timelines,
        timelineById:   timelineById,
        create:         create,
        update:         update
    };
}
