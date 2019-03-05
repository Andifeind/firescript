const FirescriptNode = require('./FirescriptNode')

class ClassExpression extends FirescriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    this.id = null
    this.superClass = null

    if (!tokenStack.expect('keyword', 'class')) {
      this.syntaxError('Unexpected token, class keyword expected', tokenStack.current())
    }

    tokenStack.goForward()

    if (tokenStack.expect('identifier')) {
      this.id = this.createIdentifierNode(tokenStack)
    }

    if (tokenStack.expect('keyword', 'extends')) {
      tokenStack.goForward()
      this.superClass = this.createIdentifierNode(tokenStack)
    }

    this.body = this.createClassBodyNode(tokenStack)

    this.tearDown()
  }

  toJSON (ctx) {
    return this.createJSON(ctx, {
      type: 'ClassExpression',
      id: this.id ? this.id.toJSON(ctx) : null,
      body: this.body ? this.body.toJSON(ctx) : null,
      superClass: this.superClass ? this.superClass.toJSON(ctx) : null
    })
  }
}

module.exports = ClassExpression
