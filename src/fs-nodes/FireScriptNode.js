class FireScriptNode {
  constructor (parent) {
    this.parent = parent || null
    this.indention = parent ? parent.indention : 0
    this.callStack = parent ? parent.callStack : []
    this.binaryOperatorPattern = /^[+*/&-]$/
  }

  createNode (tokenStack) {
    const nextToken = tokenStack[0]
    if (!nextToken) {
      return null
    }

    this.callStack.push(`${this.constructor.name} @ ${nextToken.type} | ${nextToken.value}`)

    if (nextToken.type === 'indention') {
      console.log('INDENTION', this.indention, nextToken.value)
      if (this.indention < nextToken.value) {
        return this.getNodeInstance('BlockStatement', tokenStack)
      } else {
        tokenStack.shift()
      }

      return this.createNode(tokenStack)
    }

    if (nextToken.type === 'keyword') {
      if (nextToken.value === 'import') {
        return this.getNodeInstance('ImportDeclaration', tokenStack)
      }

      if (nextToken.value === 'func') {
        return this.getNodeInstance('FunctionDeclaration', tokenStack)
      }

      if (['var', 'const', 'let'].includes(nextToken.value)) {
        return this.getNodeInstance('VariableDeclaration', tokenStack)
      }

      if (nextToken.value === 'return') {
        return this.getNodeInstance('ReturnStatement', tokenStack)
      }
    }

    if (nextToken.type === 'identifier') {
      return this.getNodeInstance('Identifier', tokenStack)
    }
    //
    // if (nextToken.type === 'literal') {
    //   return this.parseLiteral()
    // }
    //
    if (nextToken.type === 'punctation') {
      if (this.binaryOperatorPattern.test(nextToken.value)) {
        return this.getNodeInstance('BinaryExpression', tokenStack)
      }
    }

    console.log('UNUSED TOKEN', nextToken)
    this.syntaxError('Unexpected token', nextToken)
  }

  syntaxError (message, token) {
    const err = new SyntaxError(`${message} at line ${token.line[0]} at column ${token.line[1]}`)
    err.token = token
    err.callStack = this.callStack
    throw err
  }

  getNodeInstance (nodeName, tokenStack) {
    const Node = require(`./${nodeName}`)
    return new Node(tokenStack, this)
  }

  getPreviousSibling () {
    console.log('PARENT', this.parent)
  }
}

module.exports = FireScriptNode
