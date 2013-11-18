var logger = require('log4js').getLogger('PeriodModel');

module.exports = PeriodModel;

function PeriodModel(mongoose) {
    var periodModel = mongoose.model('Period', new mongoose.Schema({
        start:        String,
        end:          String,
        period:       String
    }, {
        collection: "timeline_periods"
    }));

    var holidayModel = mongoose.model('Holiday', new mongoose.Schema({
        holidays:     Array
    }, {
        collection: "timeline_periods"
    }));

    var defaultPeriodModel = mongoose.model('DefaultPeriod', new mongoose.Schema({
        defaultPeriodId:     String
    }, {
        collection: "timeline_periods"
    }));

    return {
        findAll: function(callback) {
            logger.debug("getting periods:");
            periodModel.find({'defaultPeriodId': {'$exists': false},
                              'holidays': {'$exists': false}
                             }, function(err, docs) {
                if (err) {
                    logger.error("error getting periods:", err);
                }
                callback(err, docs)
            });
        },

        getDefault: function(callback) {
            logger.debug("getting default period:");
            defaultPeriodModel.findOne({'defaultPeriodId': {'$exists': true}}, function(err, docs) {
                if (err) {
                    logger.error("error getting default period:", err);
                }
                callback(err, docs)
            });
        },

        getHolidays: function(callback) {
            logger.debug("getting holidays:");
            holidayModel.findOne({'holidays': {'$exists': true}}, function(err, docs) {
                if (err) {
                    logger.error("error getting holidays:", err);
                }
                callback(err, docs)
            });
        }
    };
}
