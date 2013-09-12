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

var config = {
    Data: {
        TEMPLATES_DIR: '/path/to/templates/',
        RECIPIENTS_LIST: '/path/to/recipients.json'
    },
    Timeout: {
        SMTP_FAILURE_RETRY: 10000,
        SMTP_RELAY_NEXT: 3000
    },
    Email: {
        PROTOCOL: 'SMTP',
        SERVICE: 'Gmail',
        SENDER: 'SenderName SenderSurname <senderemail@senderdomain.com>',
        USER_NAME: 'username@gmail.com',
        PASSWORD: 'your password'
    }
};

module.exports = config;
