/*
 * The Platform Time Editor backend REST service.
 * This module provides the setup operation for this service.
 *
 * @author Carlos Rueda
 */

/**
 * Module dependencies
 */

var logger    = require('log4js').getLogger("platim");
var mongoose  = require('mongoose');


/**
 * Expose function `setup`.
 */

module.exports = {
    setup: setup
};


/**
 * Sets up the Platform Time Editor backend REST service.
 * Should be called after the setup of mongoose and the Platform model.
 *
 * @param app          The express application object.
 * @param routePrefix  Prefix for the routes, by default '/'.
 */
function setup(app, routePrefix) {

    routePrefix = routePrefix || '/';

    logger.debug("ODSS Platim service setup: using routePrefix=", routePrefix);

    // models:
    require('./periods/models');
    require('./tokens/models');

    // controllers:
    var periods  = require('./periods');
    var tokens   = require('./tokens');

    // setup routes:
    app.get( routePrefix + 'tokens',                   tokens.findAll);
    app.get( routePrefix + 'tokens/timelines',         tokens.timelines);
    app.get( routePrefix + 'tokens/timelines/:platform_id', tokens.timelineById);
    app.post(routePrefix + 'tokens',                   tokens.create);
    app.put( routePrefix + 'tokens/:token_id',         tokens.update);
    app.del( routePrefix + 'tokens/:token_id',         tokens.del);

    app.get( routePrefix + 'periods',                  periods.findAll);
    app.get( routePrefix + 'periods/default',          periods.getDefault);
    app.put( routePrefix + 'periods/default/:period_id', periods.setDefault);
    app.del( routePrefix + 'periods/default',          periods.delDefault);
    app.get( routePrefix + 'periods/holidays',         periods.getHolidays);
    app.post(routePrefix + 'periods',                  periods.createPeriod);
    app.del( routePrefix + 'periods/:period_id',       periods.deletePeriod);
}
