const inspect = require('inspect.js')
const TokenStack = require('../../../src/TokenStack')
const VariableDeclarator = require('../../../src/fs-nodes/VariableDeclarator')

describe('VariableDeclarator', () => {
  describe('instance', () => {
    it('returns a arrow function expression node', () => {
      const tokenStack = new TokenStack([
        { type: 'identifier', value: 'res' },
        { type: 'operator', value: '=' },
        { type: 'literal', value: '\'bla\'' }
      ])

      const node = new VariableDeclarator(tokenStack)

      inspect(node).isObject()
      inspect(node.type).isEql('VariableDeclarator')
      inspect(node.toJSON()).isEql({
        type: 'VariableDeclarator',
        id: {
          type: 'Identifier',
          name: 'res'
        },
        init: {
          type: 'Literal',
          raw: '\'bla\'',
          value: 'bla'
        }
      })
    })
  })
})