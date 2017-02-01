var mongoose = require('mongoose');

var patternSchema = new mongoose.Schema({
    "name": "String",
    "cells": "Mixed"
});

module.exports = mongoose.model('Pattern', patternSchema);