var detect = require('charset-detector')
var iconv = require('iconv-lite')
var peek = require('peek-stream')
var splicer = require('stream-splicer')

function convertFrom (encoding) {
  return splicer([
      iconv.decodeStream(encoding),
      iconv.encodeStream('utf8')
    ])
}

function getSupportedEncoding (encoding) {
  if(encoding === 'ISO-8859-8-I') encoding = 'ISO-8859-8'
  if(iconv.encodingExists(encoding)) return encoding
  return 'utf8' // default
}

function toutf8 (opts) {
  if(!opts) opts = {}
  if(typeof opts === 'string') opts = { encoding: opts }
  var conf = opts.confidence || 0
  var newline = opts.newline !== false
  var detectSize = opts.detectSize || 65535
  var encoding = opts.encoding
  // encoding given
  if(encoding) return convertFrom(encoding)

  // detect encoding first
  return peek({newline: newline, maxBuffer: detectSize}, function (data, swap) {
    if(!Buffer.isBuffer(data)) return swap(new Error('No buffer'))
    var matches = detect(data)
    var encoding = matches.length > 0 && matches[0].confidence > conf
      ? matches[0].charsetName
      : 'utf8'
    encoding = getSupportedEncoding(encoding)
    swap(null, convertFrom(encoding))
  })
}

module.exports = toutf8
