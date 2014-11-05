# to-utf-8


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

## CLI

This modules includes a `to-utf-8` command line tool. It listens for a stream from
stdin and converts it to utf-8 to stdout like:

```
to-utf-8 < weirdencoding.txt > utf8encoded.txt
```

You can specify the source encoding with the `--enc` flag.