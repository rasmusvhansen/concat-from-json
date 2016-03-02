#!/usr/bin/env node
var exampleTxt = 'This will concatenate all the files in the files.json and pipe them to the file specified by the -o argument';
var stdoutTxt = 'This will concatenate all the files in the files.json and pipe them to stdout';
var argv = require('yargs')
    .option('j', {
        alias: 'json',
        demand: true,
        describe: 'json file containing array of files to concatenate',
        type: 'string'
    })
    .option('o', {
        alias: 'output',        
        describe: 'the optional resulting file of the concatenation',
        type: 'string'
    })
    .usage('$0 concat-from-json -j string [-o string]')    
    .example('concat-from-json -j files.json -o output.js', exampleTxt)
    .example('concat-from-json -j files.json > output.js', stdoutTxt)
    .help('help')
    .argv;
    
var concatFunctions = require('./concatFunctions');

concatFunctions.concatFiles(argv.j, argv.o);