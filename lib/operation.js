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

var config = require('./config');
var text = require('./text');
var mail = require('./mail');
var disconnect = require('./connection').release;

var recipients, titles, htmlTemplates, textTemplates;

function loop(done) {
    var recipient = recipients.pop(),
        counter = 0;

    if (!recipient) {

        // Close transport to shutdown connection pool
        // when you're done with the queue.
        done();

        return;
    }

    htmlTemplates.forEach(function(template, index) {
        setTimeout(function() {
            mail.send(
                recipient,
                text.parse(titles[index], recipient),
                text.parse(textTemplates[index], recipient),
                text.parse(htmlTemplates[index], recipient),
                function() {
                    counter++;

                    if(counter === htmlTemplates.length) {
                        loop(done);
                    }
                }
            );

        }, config.timeout.SMTP_RELAY_NEXT);
    });
}

exports.run = function(rRecipients, rTitles, rTextTemplates, rHtmlTemplates) {
    recipients = rRecipients;
    titles = rTitles;
    textTemplates = rTextTemplates;
    htmlTemplates = rHtmlTemplates;

    loop(disconnect);
};


