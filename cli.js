#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2))


process.stdin
  .pipe(require('./')(argv.encoding || argv.enc || argv.e))
  .pipe(process.stdout)