
module.exports = moduleExports

function moduleExports (tree) {
  const data = []

  one(tree)

  const top = data.sort().slice(- Math.round(data.length * .2))
  const mid = data.sort().slice(Math.round(data.length * .3), - Math.round(data.length * .3))
  const bot = data.sort().slice(0, Math.round(data.length * .2))

  const ranges = {
    top: Math.round((Math.max(...top) - Math.min(...top)) * 100),
    mid: Math.round((Math.max(...mid) - Math.min(...mid)) * 100),
    bot: Math.round((Math.max(...bot) - Math.min(...bot)) * 100),
  }

  return {
    data,
    ranges,
  }

  function one (node) {
    if (node.type === 'SentenceNode') {
      data.push(node.data.lexrank)
    } else {
      if (node.children) {
        node.children.forEach(one)
      }
    }
  }
}
