const textReadability = require('text-readability')

const scoreSentiment = require('./sentiment')
const scoreLexrank = require('./lexrank')
const scoreKeywords = require('./keywords')
const scoreIssues = require('./issues')

module.exports = moduleExports

function moduleExports (tree, file) {
  const { contents, messages, data } = file
  const grade = textReadability.textStandard(contents, true)
  const keywords = scoreKeywords(data.keywords)
  const issues = scoreIssues(messages)
  const sentiment = scoreSentiment(tree)
  const { sentences, count, average, intensity } = sentiment
  const lexrank = scoreLexrank(tree)

  return {
    grade,
    sentences,
    sentiment,
    lexrank,
    keywords,
    issues
  }
}
