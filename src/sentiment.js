
module.exports = moduleExports

function moduleExports (tree) {
  const data = []

  one(tree)

  const sentences = data.length
  const average = data.reduce((sum, score) => sum + score, 0) / data.length
  const count = data.reduce((sum, score) => score === 0 ? sum : sum + 1, 0)
  const intensity = data.reduce((sum, score) => sum + Math.abs(score), 0) / count

  return {
    data,
    count,
    average,
    intensity,
    ratio: Math.round(count / sentences * 100)
  }

  function one (node) {
    if (node.type === 'SentenceNode') {
      data.push(node.data.polarity)
    } else {
      if (node.children) {
        node.children.forEach(one)
      }
    }
  }
}
