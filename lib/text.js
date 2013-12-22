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

exports.parse = function(text, recipient) {
    return text.replace(/{{(.*?)}}/g, function() {
        var attribute = arguments[1];

        return recipient[attribute] ? recipient[attribute] : attribute;
    });
};

exports.formatMailOptions = function(recipient, options) {
    var parse = exports.parse;

    options.subject = parse(options.subject, recipient);
    options.text = parse(options.text, recipient);
    options.html = parse(options.html, recipient);

    return options;
};
