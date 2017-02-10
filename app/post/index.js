const model = require('./post');
const service = require('./post-service');
const routes = require('./post-routes');
console.log('do required')
console.log(routes);
module.exports = { 
      model,
      service,
      routes
};