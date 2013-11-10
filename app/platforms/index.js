var logger = require('log4js').getLogger('platforms');


function platforms(PlatformModel) {

    return {
        findAll: function(req, res, next) {
            PlatformModel.findAll(function(err, docs) {
                res.send(docs);
            });
        }
    };
}

module.exports = platforms;
