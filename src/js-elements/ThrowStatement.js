const JSElement = require('./JSElement')

/**
 * ThrowStatement
 *
 * @class ThrowStatement
 * @extends JSElement
 *
 * interface ThrowStatement {
 *   type: 'ThrowStatement';
 *   argument: Expression;
 * }
 */
class ThrowStatement extends JSElement {
  constructor (ast) {
    super(ast)

    this.argument = this.createElement(ast.argument)
  }

  compile (buffer) {
    buffer.registerItem(this.location, 'throw')
    buffer.write('throw ')
    buffer.write(this.argument)
    buffer.write(';')
  }

  toESString (ctx) {
    return this.renderElement(
      'throw ' +
      this.argument.toESString(ctx) +
      ';'
    )
  }
}

module.exports = ThrowStatement
