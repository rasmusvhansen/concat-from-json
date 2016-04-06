var fs = require('fs');
var glob = require("multi-glob").glob;
var smc = require('inline-sourcemap-concat').create();

function concatFiles(json, output, sourceMaps) {
  var globs = JSON.parse(fs.readFileSync(json.trim(), 'utf8'));
  console.log(globs);
  glob(globs, {
    strict: false
  }, function(err, files) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    var out;
    if (!sourceMaps) {
      out = files.reduce(function(prev, next) {
        return prev + fs.readFileSync(next, 'utf8') + '\n' ;
      }, '');
    }
    else {
      files.forEach(function(f) {
        smc.addFileSource(f, fs.readFileSync(f, 'utf8') + '\n');
      });

      out = smc.generate();
    }

    if (output) {
      fs.writeFile(output, out);
    }
    else {
      process.stdout.write(out, 'utf-8');
    }
  });
}

module.exports = {
  concatFiles: concatFiles
};