const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const BlockStatement = require('../../../src/fs-nodes/BlockStatement')

describe('BlockStatement', () => {
  describe('instance', () => {
    const tokenStack = new TokenStack([
      { 'type': 'indention', 'value': 2 },
      { 'type': 'keyword', 'value': 'const' },
      { 'type': 'identifier', 'value': 'res' },
      { 'type': 'operator', 'value': '=' },
      { 'type': 'identifier', 'value': 'num1' }
    ])

    it('returns a fs-node item', () => {
      const node = new BlockStatement(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('BlockStatement')
      inspect(node.body).isArray()
    })
  })
})
