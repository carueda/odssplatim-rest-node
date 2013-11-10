var logger = require('log4js').getLogger('PlatformModel');

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

    return {
        findAll: function(callback) {
            logger.debug("getting platforms:");
            model.find({}, function(err, docs) {
                if (err) {
                    logger.error("error getting platforms:", err);
                }
                callback(err, docs)
            });
        }
    };
}

module.exports = PlatformModel;
