const FireScriptNode = require('./FireScriptNode')

const ALLOWED_CALLEE_TYPES = [
  'ThisExpression',
  'Identifier',
  'Literal'
  // 'ArrayExpression',
  // 'ObjectExpression',
  // 'FunctionExpression',
  // 'ArrowFunctionExpression',
  // 'ClassExpression',
  // 'TaggedTemplateExpression',
  // 'MemberExpression',
  // 'Super',
  // 'MetaProperty',
  // 'NewExpression',
  // 'CallExpression',
  // 'UpdateExpression',
  // 'AwaitExpression',
  // 'UnaryExpression',
  // 'BinaryExpression',
  // 'LogicalExpression',
  // 'ConditionalExpression',
  // 'YieldExpression',
  // 'AssignmentExpression',
  // 'SequenceExpression'
]

class NewExpression extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    if (!tokenStack.expect('keyword', 'new')) {
      this.syntaxError('NewExpression expected!', tokenStack.current())
    }

    tokenStack.goForward()

    this.callee = this.createIdentifierNode(tokenStack)
    this.isAllowedToken(this.callee, ALLOWED_CALLEE_TYPES, tokenStack.current())
    this.arguments = []

    if (!tokenStack.expect('punctuator', '(')) {
      this.syntaxError('Unexpected token', tokenStack.current())
    }

    tokenStack.goForward()

    while (true) {
      if (tokenStack.expect('punctuator', ')')) {
        tokenStack.goForward()
        break
      }

      if (tokenStack.expect('punctuator', ',')) {
        tokenStack.goForward()
        continue
      }

      this.arguments.push(this.createNodeItem(tokenStack))
    }
  }

  toJSON () {
    return {
      type: 'NewExpression',
      callee: this.callee.toJSON(),
      arguments: this.arguments.map((item) => item.toJSON())
    }
  }
}

module.exports = NewExpression