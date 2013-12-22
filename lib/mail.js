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

var text = require('./text');
var config = require('./config');
var transport = require('./connection');

var log = console.log;
var err = console.error;

exports.send = function(recipient, subjectTemplate, textTemplate, htmlTemplate,
            callback) {
    var connection = transport.getInstance(),
        mailOptions = text.formatMailOptions(recipient, {
            from: config.email.SENDER,
            to: recipient.email,
            subject: subjectTemplate,
            text: textTemplate,
            html: htmlTemplate
        });

    console.log('Sending mail to "' + recipient.email + '"...');

    // Send mail with defined transport object.
    connection.sendMail(mailOptions, function(error/*, response*/) {
        if (error) {
            err(
                'Failed to send message to "' +
                recipient.email +
                '". Will retry in ' + config.timeout.SMTP_FAILURE_RETRY + ' seconds...'
            );

            log(error);

            recipients.push(recipient);

            setTimeout(function() {
                callback();
            }, config.timeout.SMTP_FAILURE_RETRY);

            callback();
        } else {
            log('Message sent to "' + recipient.email + '"');

            callback();
        }
    });
};
