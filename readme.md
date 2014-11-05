# to-utf-8


## Usage
```js
var utf8 = require('to-utf-8')
var fs = require('fs')

fs.createReadStream('weirdencoding.txt')
  .pipe(utf8())
  .pipe('utf8encoded.txt')
```