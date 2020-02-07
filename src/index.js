const unified = require('unified')
const vfile = require('to-vfile')
const english = require('retext-english')
const stringify = require('retext-stringify')

const assuming = require('retext-assuming')
const cliches = require('retext-cliches')
const contractions = require('retext-contractions')
const equality = require('retext-equality')
const indefinite = require('retext-indefinite-article')
const intensify = require('retext-intensify')
const overuse = require('retext-overuse')
const passive = require('retext-passive')
const readability = require('text-readability')
const simplify = require('retext-simplify')
const sentiment = require('retext-sentiment')
const textReadability = require('text-readability')

module.exports = moduleExports

async function moduleExports (contents) {
  const grade = textReadability.textStandard(contents, true)
  const file = vfile({ contents })
  const tree = await unified()
    .use(english)
    .use(assuming, {
      phrases: [
        'just',
        'simple',
        'simply',
        'easy',
        'easily',
        'trivial',
        'obviously',
        'only takes',
        'actually'
      ]
    })
    .use(cliches, { ignore: [] })
    .use(contractions)
    .use(equality)
    .use(indefinite)
    .use(intensify, { ignore: [] })
    .use(overuse, {
      ignore: [],
      list: null,
      limit: 3,
    })
    .use(passive)
    .use(readability)
    .use(simplify, { ignore: [] })
    .use(sentiment)
    .use(stringify)
    .process(file)

  console.log(grade)
  return tree.messages
}

