/*
 * Models associated with period handling.
 *
 * @author Carlos Rueda
 */

/**
 * Module dependencies
 */

var mongoose  = require('mongoose');

/**
 * Expose models `Period`, `Holiday`, `DefaultPeriod`.
 */

module.exports = {
    Period: mongoose.model('Period', new mongoose.Schema({
        start:        String,
        end:          String,
        period:       String
    }, {
        collection: "timeline_periods"
    })),

    Holiday: mongoose.model('Holiday', new mongoose.Schema({
        holidays:     Array
    }, {
        collection: "timeline_periods"
    })),

    DefaultPeriod: mongoose.model('DefaultPeriod', new mongoose.Schema({
        defaultPeriodId:     String
    }, {
        collection: "timeline_periods"
    }))
};
