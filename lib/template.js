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

var fs = require('fs');
var path = require('path');

var config = require('./config');

var kTitleExtension = '.title';

var templates = fs.readdirSync(config.Data.TEMPLATES_DIR);

exports.prepareGlobals = function(htmlTemplates, textTemplates, titles) {
    templates.forEach(function(file) {
        var filePath = path.join(config.data.TEMPLATES_DIR, file),
            htmlTemplate, textTemplate;

        if (filePath.indexOf(kTitleExtension) > -1) {
            titles.push(fs.readFileSync(filePath).toString().trim());
        } else {
            htmlTemplate = fs.readFileSync(filePath).toString();

            // Very basic formatting.
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
};
