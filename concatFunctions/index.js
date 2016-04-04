var fs = require('fs');
var glob = require('glob');
function concatFiles(json, output) {
  var files = flatmap(JSON.parse(fs.readFileSync(json.trim(), 'utf8'))
    .map(function (pattern) {
      var files = glob.sync(pattern);
      return files;
    }), function (file) {
    return file;
  });

  var concatted =
    files.reduce(function (prev, next) {
      return prev + fs.readFileSync(next, 'utf8') + '\n';
    }, '').trim();

  if (output) {
    fs.writeFileSync(output, concatted)
  } else {
    process.stdout.write(concatted);
  }
}

module.exports = {
  concatFiles: concatFiles
};

function flatmap(arr, iter, context) {
  var results = [];
  if (!Array.isArray(arr)) return results;
  arr.forEach(function (value, index, list) {
    var res = iter.call(context, value, index, list);
    if (Array.isArray(res)) {
      results.push.apply(results, res);
    } else if (res != null) {
      results.push(res);
    }
  });
  return results;
};