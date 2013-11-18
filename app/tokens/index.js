var logger = require('log4js').getLogger('tokens');

module.exports = tokens;

function tokens(TokenModel) {

    return {
        findAll: function(req, res) {
            TokenModel.findAll(function(err, docs) {
                res.send(docs);
            });
        },

        timelines: function(req, res) {
            TokenModel.timelines(function(err, docs) {
                res.send(docs);
            });
        },

        timelineById: function(req, res) {
            var platform_id = req.params.platform_id;
            logger.debug("timelineById=", platform_id);
            TokenModel.timelineById(platform_id, function(err, docs) {
                res.send(docs);
            });
        }
    };
}
