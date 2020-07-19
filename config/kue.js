const kue = require('kue');
const { query } = require('express');
const queue = kue.createQueue();

module.exports = queue;
