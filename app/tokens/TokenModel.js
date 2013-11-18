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

    return {
        findAll:        findAll,
        timelines:      timelines,
        timelineById:   timelineById
    };
}
