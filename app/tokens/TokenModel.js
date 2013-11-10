var logger = require('log4js').getLogger('TokenModel');

function TokenModel(mongoose) {
    var model = mongoose.model('Token', new mongoose.Schema({
        platform_id:  String,
        start:        String,
        end:          String,
        state:        String,
        description:  String
    }, {
        collection: "timeline_tokens"
    }));

    return {
        findAll: function(callback) {
            logger.debug("getting tokens:");
            model.find({}, function(err, docs) {
                if (err) {
                    logger.error("error getting tokens:", err);
                }
                callback(err, docs)
            });
        }
    };
}

module.exports = TokenModel;
