var utf8 = require('./')
var fs = require('fs')
var path = require('path')

// Visual test right now. What would be a good way to test this properly?

var testFilesPath = './node_modules/charset-detector/tests/fixtures'

var testfiles = fs.readdirSync(testFilesPath)
testfiles = testfiles
  .map(function (file) {
    return path.resolve(testFilesPath, file)
  })
  .filter(function (file) {
    var stats = fs.statSync(file)
    return !stats.isDirectory()
  })

function loop () {
  var current = testfiles.pop()
  if (!current) return

  var readstream = fs.createReadStream(current)

  readstream.on('end', loop)

  readstream
    .pipe(utf8({confidence: 20}))
    .pipe(process.stdout)
}

loop()
