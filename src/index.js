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
const readability = require('retext-readability')
const simplify = require('retext-simplify')
const sentiment = require('retext-sentiment')
const pos = require('retext-pos')
const keywords = require('retext-keywords')
const lexrank = require('retext-lexrank')
const textReadability = require('text-readability')

const getSentiment = require('./sentiment')
const getLexrank = require('./lexrank')
const getKeywords = require('./keywords')
const getIssues = require('./issues')
const getContent = require('./content')

module.exports = moduleExports

function moduleExports (contents) {
  const file = vfile({ contents })
  const processor = unified()
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
    .use(pos)
    .use(keywords, { maximum: 8 })
    .use(lexrank)
    .use(stringify)

  const tree = processor.parse(file)

  processor.run(tree, file)

  return score(tree, file)

  function score (tree, file) {
    const { contents, messages, data } = file

    return {
      grade: textReadability.textStandard(contents, true),
      ...getContent(tree), // { sentences, words }
      sentiment: getSentiment(tree),
      lexrank: getLexrank(tree),
      keywords: getKeywords(data.keywords),
      issues: getIssues(messages),
    }
  }
}

