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

var config = require('./config');

exports.getAll = function() {
    return JSON.parse(
        fs.readFileSync(config.data.RECIPIENTS_LIST).toString()
    );
};
