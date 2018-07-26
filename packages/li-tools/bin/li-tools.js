#!/usr/bin/env node

const program = require('commander')
const { spawn }  = require('child_process')
const path = require('path')
const packageJson = require('../package.json')
const version = packageJson.version

function useBabel(val) {
  if (val === undefined) return true
  return !!val
}

program
  .version(version, '-v, --version')
  .usage('[options] <file ...>')
  
  // .option('start', 'start a project')
  // .parse(process.argv)

let script = ''
program
  .command('start')
  .option('--eslint <boolean>', 'open or close eslint')
  .option('--no-babel <boolean>', 'use only babel for react', useBabel)
  .action((options) => {
    script = 'server'
  })

program
  .command('build')
  .action(() => {
    script = 'build'
  })

program.parse(process.argv)

const extra = process.argv.slice(3).concat([`--no-babel=${program['no-babel']}`])
console.log(program['no-babel'])
if (!script) {
  program.help()
  process.exit(1)
}

spawn('node', [path.resolve(__dirname, `../lib/${script}.js`), ...extra], { stdio: 'inherit' })
// program.project && spawn('node', [path.resolve(__dirname, '../lib/server.js')], { stdio: 'inherit' })