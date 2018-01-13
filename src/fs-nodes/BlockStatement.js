const FireScriptNode = require('./FireScriptNode')

const ALLOWED_CHILDS = [
  'BlockStatement',
  'BreakStatement',
  'ClassDeclaration',
  'ContinueStatement',
  'DebuggerStatement',
  'DoWhileStatement',
  'EmptyStatement',
  'ExpressionStatement',
  'ForStatement',
  'ForInStatement',
  'ForOfStatement',
  'FunctionDeclaration',
  'IfStatement',
  'LabeledStatement',
  'ReturnStatement',
  'SwitchStatement',
  'ThrowStatement',
  'TryStatement',
  'VariableDeclaration',
  'WhileStatement',
  'WithStatement'
]

class BlockStatement extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    const token = tokenStack.shift()

    if (token.type !== 'indention') {
      this.syntaxError('Unexpected token', token)
    }

    this.body = []
    this.indention = token.value

    while (true) {
      const nextToken = tokenStack[0]
      if (!nextToken) {
        break
      }

      if (nextToken.type === 'indention' && nextToken.value < this.indention) {
        break
      }

      const child = this.createNode(tokenStack)
      this.isAllowedToken(child, ALLOWED_CHILDS)
      this.body.push(child)
    }
  }

  toJSON () {
    return {
      type: 'BlockStatement',
      body: this.body.map((item) => item.toJSON())
    }
  }
}

module.exports = BlockStatement