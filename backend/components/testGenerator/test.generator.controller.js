let model = require('./test.generator.model');
let debug = require('debug')('test_generator_model');
function generateTest (req, res, next) {
    model.startTest(req.body, function (error, result) {
        if (error) {
            debug(error);
            return next(error);
        }
        res.status(200).json(result);
    });
}
module.exports = {generateTest};