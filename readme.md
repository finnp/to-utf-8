# to-utf-8

Install with `npm install to-utf-8` and optionally use the `-g` flag to install the
command line utility.


## Usage
```js
var utf8 = require('to-utf-8')
var fs = require('fs')

fs.createReadStream('weirdencoding.txt')
  .pipe(utf8())
  .pipe('utf8encoded.txt')
```

You can also provide the encoding, if known:

```js
var utf8 = require('to-utf-8')
var fs = require('fs')

fs.createReadStream('utf16-le-file.txt')
  .pipe(utf8('utf16-le'))
  .pipe('utf8encoded.txt')
```

You can also pass an options object instead with the following keys:
* `confidence` Minimum confidence for the detected source encoding. If not reached assume `utf-8`
* `encoding` Same as passing a string directly. Use the given encoding instead of detecting it.

## CLI

This modules includes a `to-utf-8` command line tool. It listens for a stream from
stdin and converts it to utf-8 to stdout like:

```
to-utf-8 < weirdencoding.txt > utf8encoded.txt
```

You can specify the source encoding with the `--enc` flag.