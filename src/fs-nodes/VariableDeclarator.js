const FireScriptNode = require('./FireScriptNode')

class VariableDeclarator extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(parent)

    // if (this.parent.type !== 'VariableDeclaration') {
    //   this.syntaxError('Parser error! VariableDeclaration expected but is ' + this.parent.type)
    // }

    this.id = this.createIdentifierNode(tokenStack)

    const nextToken = tokenStack[0]
    if (nextToken.type === 'punctation' && nextToken.value === '=') {
      tokenStack.shift()
      this.init = this.getNextValueNodes(tokenStack)
    }
  }

  toJSON () {
    return {
      type: 'VariableDeclarator',
      id: this.id.toJSON(),
      init: this.init ? this.init.toJSON() : null
    }
  }
}

module.exports = VariableDeclarator