/*
 * Models associated with tokens.
 *
 * @author Carlos Rueda
 */

/**
 * Module dependencies
 */

var mongoose  = require('mongoose');

/**
 * `Token` model.
 *
 * @class Token
 */
var Token = mongoose.model('Token', new mongoose.Schema({
    platform_id:  String,
    start:        String,
    end:          String,
    state:        String,
    description:  String
}, {
    collection: "timeline_tokens"
}));


/**
 * Expose model `Token`.
 */

module.exports = {
    Token: Token
};
