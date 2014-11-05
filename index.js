var detect = require('charset-detector')
var iconv = require('iconv-lite')
var peek = require('peek-stream')
var through = require('through2')
var splicer = require('stream-splicer')

var toutf8 = function (encoding) {
  return splicer([
      iconv.decodeStream(encoding),
      iconv.encodeStream('utf8')
    ])
}

var convert = function () {
  return peek(function (data, swap) {
    if(!Buffer.isBuffer(data)) return swap(new Error('No buffer'))
    var matches = detect(data)
    var encoding = matches[0].charsetName
    swap(null, toutf8(encoding))
  })
}

module.exports = convert