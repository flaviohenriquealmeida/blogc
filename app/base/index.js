const header = require('./views/header.marko');
const footer = require('./views/footer.marko');
const messages = require('./views/messages.marko');
const page404 = require('./views/errors/404.marko');
const page500 = require('./views/errors/500.marko');

module.exports = {

    views: {
        footer, 
        header, 
        messages,
        errors: { 
            page404,
            page500 
        }
    }
}
