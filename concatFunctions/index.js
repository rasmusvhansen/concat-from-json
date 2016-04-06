var fs = require('fs');
var glob = require('glob');
var Concat = require('concat-with-sourcemaps')

function concatFiles(json, output) {
  var concat = new Concat(true, output, '\n');
  var files = flatmap(JSON.parse(fs.readFileSync(json.trim(), 'utf8'))
    .map(function(pattern) {
      var files = glob.sync(pattern);
      return files;
    }),
    function(file) {
      return file;
    });

  files.forEach(function(f) {
    concat.add(f, fs.readFileSync(f, 'utf8'));
  });
 
  if (output) {
    fs.writeFile(output, concat.content, 'utf-8');
    fs.writeFile(output + '.map', concat.sourceMap, 'utf-8');
  }
  else {
    process.stdout.write(concat.content, 'utf-8');
  }
}

module.exports = {
  concatFiles: concatFiles
};

function flatmap(arr, iter, context) {
  var results = [];
  if (!Array.isArray(arr)) return results;
  arr.forEach(function(value, index, list) {
    var res = iter.call(context, value, index, list);
    if (Array.isArray(res)) {
      results.push.apply(results, res);
    }
    else if (res != null) {
      results.push(res);
    }
  });
  return results;
};