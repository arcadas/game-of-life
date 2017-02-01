/**
 * Pattern API endpoint
 */
var Pattern = require('./../models/pattern.model');

module.exports = {

    // Create / Update pattern by given name and cells
    save: function (req, res) {

        var name = req.body.name;
        var cells = JSON.stringify(req.body.cells);

        Pattern.findOne({ name: name }, function (err, pattern) {
            if (err) {
                return res.status(400).send();
            }

            if (pattern) {

                // If name is exists, this is an update
                Pattern.findOneAndUpdate({ name: name }, {
                    $set: { cells: cells }
                }, { new: true }, function (err, pattern) {
                    if (err) {
                        return res.status(400).send();
                    }
                    res.status(200).send();
                });

            } else {

                // If name does not exists, this is a creation
                Pattern.create({
                    name: name,
                    cells: cells
                }, function (err, pattern) {
                    if (err) {
                        return res.status(400).send();
                    }
                    res.status(200).send();
                });

            }
        })
    },

    // Get names of patterns
    list: function (req, res) {

        Pattern.find({}, 'name', function (err, patterns) {
            if (err) {
                return res.status(400).send();
            }
            res.send(patterns);
        })
    },

    // Get one pattern's cells by name
    get: function (req, res) {

        var name = req.params.name;

        Pattern.findOne({ name: name }, function (err, pattern) {
            if (err) {
                return res.status(400).send();
            }
            res.send(pattern.cells);
        })
    }
}