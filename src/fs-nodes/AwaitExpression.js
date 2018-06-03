const FireScriptNode = require('./FireScriptNode')

/**
 * AwaitExpression
 *
 * @class AwaitExpression
 * @extends FireScriptNode
 *
 * interface AwaitExpression {
 *   type: 'AwaitExpression';
 *   argument: Expression | null;
 * }
 */
class AwaitExpression extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    if (!tokenStack.expect('keyword', 'await')) {
      this.syntaxError('Unexpected token, await keyword expected', tokenStack)
    }

    tokenStack.goForward()
    this.argument = this.createFullNode(tokenStack)
  }

  toJSON () {
    return this.createJSON({
      type: 'AwaitExpression',
      argument: this.argument.toJSON()
    })
  }
}

module.exports = AwaitExpression
