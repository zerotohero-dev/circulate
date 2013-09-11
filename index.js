'use strict';

var fs = require('fs');
var nodemailer = require('nodemailer');
var path = require('path');

var config = require('./lib/config');

var recipients = JSON.parse(
        fs.readFileSync(config.data.RECIPIENTS_LIST).toString()
    );

var smtpTransport = nodemailer.createTransport(
    config.email.PROTOCOL, {
    service: config.email.SERVICE,
    auth: {
        user: config.email.USER_NAME,
        pass: config.email.PASSWORD
    }
});

var htmlTemplates = [];
var textTemplates = [];
var titles = [];

var templates = fs.readdirSync(config.data.TEMPLATES_DIR);

templates.forEach(function(file) {
    var filePath = path.join(config.data.TEMPLATES_DIR, file),
        htmlTemplate, textTemplate;

    if (filePath.indexOf('.title') > -1) {
        titles.push(fs.readFileSync(filePath).toString().trim());
    } else {
        htmlTemplate = fs.readFileSync(filePath).toString();

        textTemplate = htmlTemplate.replace(
            /<a href="(.*)">(.*)<\/a>/g, '"$2" ( $1 )'
        ).replace(
            /<hr.*?>/g,
            '\n--------------------------------\n'
        ).replace(
            /<.*?>/g,
            ''
        );

        htmlTemplates.push(htmlTemplate);
        textTemplates.push(textTemplate);
    }
});

function sendMail(recipient, subject, textTemplate, htmlTemplate, callback) {
    console.log('sending mail to ' + recipient.email);

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: 'Volkan Özçelik <volkan@o2js.com>',
        to: 'volkan@sarmal.com',
        subject: subject.replace(/{{firstName}}/g, recipient.name),
        text: textTemplate.replace(/{{firstName}}/g, recipient.name),
        html: htmlTemplate.replace(/{{firstName}}/g, recipient.name)
    };

    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error/*, response*/) {
        if (error) {
            console.error('Failed to send message to to "' +
                recipient.email + '". Will retry in 10 seconds.');
            console.log(error);

            recipients.push(recipient);

            setTimeout(function() {
                callback();
            }, 10000);

            callback();
        } else {
            console.log('Message sent to "' + recipient.email + '"');

            callback();
        }
    });
}

function parse(text, recipient) {
    return text.replace(/{{(.*?)}}/g, function() {
        var attribute = arguments[1];

        return recipient[attribute] ? recipient[attribute] : attribute;
    });
}

function loop() {
    var recipient = recipients.pop(),
        counter = 0;

    if (!recipient) {
        // TODO: close transport when you're done with the queue
        //smtpTransport.close(); // shut down the connection pool,

        return;
    }

    htmlTemplates.forEach(function(template, index) {
        setTimeout(function() {
            sendMail(
                recipient,
                parse(titles[index], recipient),
                parse(textTemplates[index], recipient),
                parse(htmlTemplates[index], recipient),
                function() {
                    counter++;

                    if(counter === htmlTemplates.length) {
                        loop();
                    }
                }
            );

            //TODO: magic number! Move to config.
        }, 3000);
    });
}

loop();
