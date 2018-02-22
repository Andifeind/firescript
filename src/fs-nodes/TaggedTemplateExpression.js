const FireScriptNode = require('./FireScriptNode')

/**
 * Tagged Template Expression
 *
 * interface TaggedTemplateExpression {
 *   type: 'TaggedTemplateExpression';
 *   tag: Expression;
 *   quasi: TemplateLiteral;
 * }
 *
 * @class TaggedTemplateExpression
 * @extends FireScriptNode
 */
class TaggedTemplateExpression extends FireScriptNode {
  constructor (tokenStack, parent, tag) {
    super(parent)

    this.tag = tag || this.createFullNode(tokenStack)
    if (!this.isExpressionNode(this.tag)) {
      this.syntaxError(`Node ${this.tag.type} is not an Expression node`)
    }

    this.quasi = this.createTempalteLiteralNode(tokenStack)
  }

  toJSON () {
    return {
      type: 'TaggedTemplateExpression',
      tag: this.tag.toJSON(),
      quasi: this.quasi.toJSON()
    }
  }
}

module.exports = TaggedTemplateExpression