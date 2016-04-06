var fs = require('fs');
var glob = require("multi-glob").glob;
var Concat = require('concat-with-sourcemaps')

function concatFiles(json, output) {
  var concat = new Concat(true, output, '\n');
  var globs = JSON.parse(fs.readFileSync(json.trim(), 'utf8'));
  console.log(globs);
  glob(globs, {strict: true}, function(err, files) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    files.forEach(function(f) {
      concat.add(f, fs.readFileSync(f, 'utf8'));
    });

    if (output) {
      var mapFile = output + '.map';
      fs.writeFile(output, concat.content + '\n//# sourceMappingURL=/' + mapFile.replace('webapp/', ''), 'utf-8');
      fs.writeFile(output + '.map', concat.sourceMap, 'utf-8');
    }
    else {
      process.stdout.write(concat.content, 'utf-8');
    }
  });
}

module.exports = {
  concatFiles: concatFiles
};