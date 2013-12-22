'use strict';

 /*                        ` '
  *                         * -
  *        _________________)`
  *       /`.{circulate},-'/
  *      /   `.    _,-'   /    A template-based
  *     /   ,-'`.-'.     /    bulk e-mail sending
  *    /_,-'        `.  /    solution.
  *   /'______________`/
  */

var nodemailer = require('nodemailer');

var config = require('./config');

var transport = null;

function init() {
    if (transport) {return transport;}

    transport = nodemailer.createTransport(
        config.email.PROTOCOL, {
        service: config.email.SERVICE,
        auth: {
            user: config.email.USER_NAME,
            pass: config.email.PASSWORD
        }
    });

    return transport;
}

exports.release = function() {
    if (!transport) {
        return;
    }

    transport.close();

    transport = null;
};

exports.getInstance = function() {
    return transport ? transport : init();
};
