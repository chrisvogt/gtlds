'use strict';

const uniqueRandomArray = require('unique-random-array');
const collection = require('./gtlds.json');

const get = needle => collection.find(({gTLD}) => gTLD === needle);
const names = collection.map(({gTLD}) => gTLD);
const isValid = needle => names.includes(needle);

module.exports.all = collection;
module.exports.get = get;
module.exports.isValid = isValid;
module.exports.names = names;
module.exports.random = uniqueRandomArray(collection);
