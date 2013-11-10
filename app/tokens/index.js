var logger = require('log4js').getLogger('tokens');

function tokens(TokenModel) {

    return {
        findAll: function(req, res, next) {
            TokenModel.findAll(function(err, docs) {
                res.send(docs);
            });
        }
    };
}

module.exports = tokens;
