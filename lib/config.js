'use strict';

var config = {
    data: {
        TEMPLATES_DIR: '/path/to/templates/',
        RECIPIENTS_LIST: '/path/to/recipients.json'
    },
    email: {
        PROTOCOL: 'SMTP',
        SERVICE: 'Gmail',
        USER_NAME: 'username@gmail.com',
        PASSWORD: 'your password'
    }
};

module.exports = config;
