var fs = require('fs');
function concatFiles(json, output) {
    var files = JSON.parse(fs.readFileSync(json.trim(), 'utf8'));
    var concatted = files.reduce(function (prev, next) { return prev + fs.readFileSync(next, 'utf8') + '\n'; }, '');
    
    output ? fs.writeFileSync(output, concatted) : process.stdout.write(concatted);
}

module.exports = {
    concatFiles: concatFiles    
};