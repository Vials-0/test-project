const test = require('./routes/test');
const places = require('./routes/places');


module.exports = (app) => {
    test(app);
    places(app);
}