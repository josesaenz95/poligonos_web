const main = require('./main-routes');
const user = require('./user-routes');

module.exports = (app) => {
    app.use('/', main);
    app.use('/user', user);
}