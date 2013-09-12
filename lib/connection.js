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
        config.Email.PROTOCOL, {
        service: config.Email.SERVICE,
        auth: {
            user: config.Email.USER_NAME,
            pass: config.Email.PASSWORD
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
