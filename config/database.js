const mongoose = require('mongoose');
mongoose.Promise = Promise;

module.exports = uri => {
	
	mongoose.connect(uri);
    const conn = mongoose.connection;

	conn.on('connected', () => 
	  console.log('Mongoose! Connected! ' + uri));

	conn.on('disconnected', () => 
	  console.log('Mongoose! Disconnected from ' + uri));

	conn.on('error', err =>
	  console.log('Mongoose! Connection error: ' + err));

	process.on('SIGINT', () => conn.close(() => {
        console.log('Mongoose! Disconnected by application termination');
        process.exit(0);
    }));
};