
const scores = {
  'retext-assuming': 0,
  'retext-cliche': 1,
  'retext-contractions': 0,
  'retext-equality': 1,
  'retext-indefinite-article': 1,
  'retext-intensify': 1,
  'retext-overuse': 1,
  'retext-passive': 0,
  'retext-readability': 1,
  'retext-simplify': 1,
}

module.exports = moduleExports

function moduleExports (messages) {
  const result = messages.reduce((sum, message) => {
    const { source, ruleId } = message
    return sum + scores[source]
  }, 0)
  return messages.map(({ message, source, ruleId, actual }) => ({
    // message,
    source,
    ruleId,
    // actual
  }))
}
