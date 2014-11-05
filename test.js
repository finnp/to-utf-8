var utf8 = require('./')

var stream = utf8()
stream.pipe(process.stdout)

stream.write(new Buffer('flkjsflsdjfoij@@K:äää', 'utf8'))
stream.write(new Buffer('flkjsflsdjfoij@@K:äää', 'utf16le'))
stream.end()