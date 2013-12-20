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
    data: {
        TEMPLATES_DIR: '/path/to/templates/',
        RECIPIENTS_LIST: '/path/to/recipients.json'
    },
    timeout: {
        SMTP_FAILURE_RETRY: 10000,
        SMTP_RELAY_NEXT: 3000
    },
    email: {
        PROTOCOL: 'SMTP',
        SERVICE: 'Gmail',
        SENDER: 'SenderName SenderSurname <senderemail@senderdomain.com>',
        USER_NAME: 'username@gmail.com',
        PASSWORD: 'your password'
    }
};

module.exports = config;
