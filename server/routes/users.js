
const { postUser } = require('../controller/Users.js')

module.exports = (app, next) => {

    app.post('/users', postUser);
}