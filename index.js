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

function toutf8 (encoding) {
  // encoding given
  if(encoding) return convertFrom(encoding)
    
  // detect encoding first
  return peek(function (data, swap) {
    if(!Buffer.isBuffer(data)) return swap(new Error('No buffer'))
    var matches = detect(data)
    var encoding = matches.length > 0 ? matches[0].charsetName : 'utf8'
    encoding = getSupportedEncoding(encoding)
    swap(null, convertFrom(encoding))
  })
}

module.exports = toutf8