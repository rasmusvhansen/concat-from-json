# concat-from-json
Simple file concatenation reading list of files to concat from json array. Uses stdout for output or optional file.
Also supports globs in list of files.

##Usage
```
concat-from-json -j config.json > out.js

// or

concat-from-json -j config.json -o out.js
```

