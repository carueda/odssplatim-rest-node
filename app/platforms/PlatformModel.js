var logger = require('log4js').getLogger('PlatformModel');

module.exports = PlatformModel;

function PlatformModel(mongoose) {
    var model = mongoose.model('Platform', new mongoose.Schema({
        trackingDBID: {type: Number},
        name: {type: String},
        color: {type: String},
        abbreviation: {type: String},
        typeName: {type: String}
    }, {
        collection: "platforms"
    }));

    /** gets all platforms */
    var findAll = function(callback) {
        logger.debug("getting platforms:");
        model.find({}, function(err, docs) {
            if (err) {
                logger.error("error getting platforms:", err);
            }
            callback(err, docs)
        });
    };

    /** gets platforms by given ids */
    var findByIds = function(ids, callback) {
        logger.debug("getting platforms by given ids:");
        model.find({_id: { '$in': ids}}, function(err, docs) {
            if (err) {
                logger.error("error getting platforms by given ids:", err);
            }
            callback(err, docs)
        });
    };


    return {
        findAll:     findAll,
        findByIds:   findByIds
    };
}
