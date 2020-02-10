const toString = require('nlcst-to-string')

module.exports = moduleExports

const hasOwn = {}.hasOwnProperty

function moduleExports (keywords) {
  const result = keywords.reduce((arr, { stem, score, matches }, index) => {
    const matchesDict = matches.reduce((obj, { node }) => {
      const str = toString(node)
      return {
        ...obj,
        [str]: obj.hasOwnProperty(str) ? obj[str] + 1 : 1
      }
    }, {})
    const [ match ] = Object.entries(matchesDict).reduce((top, candidate) => {
      const [ match, count ] = candidate
      if (count > top[1]) {
        return candidate
      }
      return top
    }, ['0', 0])
    return arr.concat({
      matches: Object.keys(matchesDict),
      count: matches.length,
      match,
      stem,
      score,
    })
  }, [])

  return result
}
