const fs = require('fs')
const retextGrade = require('../src')

main()

function main () {
  const file = fs.readFileSync('fixtures/wired_bloomber-tech-bro/input.txt', 'utf-8')
  const result = retextGrade(file)
  const {
    grade,
    sentences,
    wordCount,
    sentiment,
    lexrank,
    keywords,
    issues,
  } = result

  console.log()
  console.log('sentences:  ', sentences.map(s => s.length))
  console.log('sentiments: ', sentiment)
  console.log('lexrank:    ', lexrank)
  console.log('keywords:   ', keywords)
  console.log('issues:     ', issues) // Math.round(issues / sentences * 100))
  console.log('grade:      ', grade)
  console.log('word count: ', wordCount)
  console.log('sentiment:  ', Math.round(sentiment.average * 100))
  console.log('intensity:  ', sentiment.intensity)
  console.log('sentiments: ', sentiment.ratio)
  console.log('time:       ', Math.round(wordCount / 250) + 'm')
}
