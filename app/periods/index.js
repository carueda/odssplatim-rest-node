var logger = require('log4js').getLogger('periods');

module.exports = periods;

function periods(PeriodModel) {

    return {
        findAll: function(req, res, next) {
            PeriodModel.findAll(function(err, docs) {
                res.send(docs);
            });
        },

        getDefault: function(req, res, next) {
            PeriodModel.getDefault(function(err, docs) {
                res.send(docs);
            });
        },

        getHolidays: function (req, res, next) {
            PeriodModel.getHolidays(function(err, docs) {
                res.send(docs);
            });
        },

        createPeriod: function(req, res, next){
            var data = req.body;
            logger.info("createPeriod: req.body=", req.body);
            PeriodModel.createPeriod(data, function(err, created) {
                if (err) {
                    next(err);
                }
                else {
                    res.send(created);
                }
            });
        }
    };
}
