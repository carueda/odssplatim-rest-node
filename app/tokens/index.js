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
        },

        create: function(req, res, next){
            var data = req.body;
            logger.info("create token: req.body=", req.body);
            TokenModel.create(data, function(err, created) {
                if (err) {
                    next(err);
                }
                else {
                    res.send(created);
                }
            });
        },

        update: function(req, res, next){
            var token_id = req.params.token_id;
            var data = req.body;
            logger.info("update token: token_id=", token_id, "req.body=", req.body);
            TokenModel.update(token_id, data, function(err, updated) {
                if (err) {
                    next(err);
                }
                else {
                    res.send(updated);
                }
            });
        }
    };
}
