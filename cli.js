#!/usr/bin/env node

var config = require('./config')

var opts = require('minimist')(process.argv.slice(2))

if (opts.version) return console.log(config.VERSION)
if (opts.stack) config.STACK = opts.stack

var lambci = require('./index.js')

var cmd = opts._ && opts._[0]

if (typeof lambci[cmd] != 'function') {
  var isErr = !(opts.help || opts.h)
  console[isErr ? 'error' : 'log'](
`
Usage: lambci [--stack <stack>] <cmd> [options]

A command line tool for administering LambCI

Options:
--stack <stack>   LambCI stack name / prefix to use (default: lambci)
--help            Display help about a particular command

Commands:
info              General info about the LambCI stack
config            Display/edit config options
hook              Add/remove/update/show hook for GitHub repo
rebuild           Run a particular project build again

Report bugs at github.com/lambci/cli/issues
`
  )
  return process.exit(isErr ? 1 : 0)
}

lambci[cmd](opts)
