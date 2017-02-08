const app = require('./config/custom-express');
require('./config/database')('mongodb://localhost/blog');
app.listen(8080, () => console.log('Server ready'));