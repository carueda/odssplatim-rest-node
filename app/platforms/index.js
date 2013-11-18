var logger = require('log4js').getLogger('platforms');

module.exports = platforms;

function platforms(PlatformModel) {

    return {
        findAll: function(req, res, next) {
            PlatformModel.findAll(function(err, docs) {
                res.send(docs);
            });
        }
    };
}
