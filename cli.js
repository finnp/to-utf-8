#!/usr/bin/env node

var opts = require('minimist')(process.argv.slice(2))

if (opts.h || opts.help) {
  console.error('usage: to-utf-8 [--enc <source encoding>] [--conf <minimum confidence>]')
  process.exit()
}

opts.encoding = opts.encoding || opts.enc || opts.e
opts.confidence = Number(opts.confidence || opts.conf || opts.c)

process.stdin
  .pipe(require('./')(opts))
  .pipe(process.stdout)
