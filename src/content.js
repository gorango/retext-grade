const toString = require('nlcst-to-string')

module.exports = moduleExports

function moduleExports (tree) {
  const sentences = []
  const words = []

  extract(tree)

  function extract (node) {
    if (node.type === 'SentenceNode') {
      sentences.push(toString(node))
    }
    if (node.type === 'WordNode') {
      words.push(toString(node))
    }
    if (node.children) {
      node.children.forEach(extract)
    }
  }

  return {
    sentences,
    wordCount: words.length
  }
}