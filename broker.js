#!/usr/bin/env node

var pig = require('./lib/pig-rpc');

var url = process.argv[2] || 'tcp://*:55555';

pig(url).broker(function () {
    console.log('pig-rpc broker started at', url);
});
