let model = require('./testGeneratorModel');
let debug = require('debug')('test_generator_model');
exports.generateTest = function (req, res, next) {
    model.startTest(req.body, function (error, result) {
        if (error) {
            debug(error);
            return next(error);
        }
        res.status(200).json(result);
    });
}