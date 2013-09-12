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

var template = require('./lib/template');
var operation = require('./lib/operation');
var addressBook = require('./lib/addressBook');

var recipients = addressBook.getAll();
var htmlTemplates = [];
var textTemplates = [];
var titles = [];

template.prepareGlobals(htmlTemplates, textTemplates, titles);

operation.run(recipients, titles, textTemplates, htmlTemplates);
