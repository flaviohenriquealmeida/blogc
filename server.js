const app = require('./config/custom-express');
require('./config/database')('mongodb://localhost/blog');
app.listen(3000, () => console.log('Server ready'));