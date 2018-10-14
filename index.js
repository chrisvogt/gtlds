'use strict';

const uniqueRandomArray = require('unique-random-array');
const collection = require('./gtlds.json');

const names = collection.map(({gTLD}) => gTLD);

module.exports.all = collection;
module.exports.names = names;
module.exports.random = uniqueRandomArray(collection);
