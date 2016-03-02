var exampleTxt = 'This will concatenate all the files in the files.json and pipe them to stdout';
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
    .usage('$0 concat-from-json -j string -o string')
    .example('concat-from-json -j files.json', exampleTxt)
    .help('help')
    .argv;
    
var concatFunctions = require('./concatFunctions');

concatFunctions.concatFiles(argv.j, argv.o);