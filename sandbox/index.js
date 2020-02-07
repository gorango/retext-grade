const fs = require('fs')
const path = require('path')
const vfile = require('vfile')

const grade = require('../src')

main()

async function main () {
  const file = fs.readFileSync('fixtures/basic/input.txt', 'utf-8')
  const result = await grade(file)
  console.log(result)
}
