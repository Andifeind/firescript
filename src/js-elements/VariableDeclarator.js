const JSElement = require('./JSElement')

/**
 * VariableDeclarator
 *
 * @class VariableDeclarator
 * @extends JSElement
 *
 * interface VariableDeclarator {
 *   type: 'VariableDeclarator';
 *   id: Identifier | BindingPattern;
 *   init: Expression | null;
 * }
*/
class VariableDeclarator extends JSElement {
  constructor (ast) {
    super(ast)

    this.id = this.createElement(ast.id)
    this.init = ast.init ? this.createElement(ast.init) : null
  }

  compile (buffer) {
    buffer.write(this.id)

    if (this.init) {
      buffer.write(' = ')
      buffer.write(this.init)
    }
  }
}

module.exports = VariableDeclarator
