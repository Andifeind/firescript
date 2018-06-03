const FireScriptNode = require('./FireScriptNode')

/**
 * ExportSpecifier
 *
 * @class ExportSpecifier
 * @extends FireScriptNode
 *
 * interface ExportSpecifier {
 *     type: 'ExportSpecifier'
 *     local: Identifier;
 *     exporte?: Identifier;
 * }
 */
class ExportSpecifier extends FireScriptNode {
  constructor (tokenStack, parent) {
    super(tokenStack, parent)

    this.exported = this.createIdentifierNode(tokenStack)
    this.local = this.exported

    const nextToken = tokenStack.current()
    if (nextToken.value === 'as') {
      tokenStack.next()
      this.local = this.createIdentifierNode(tokenStack)
    }
  }

  toJSON () {
    return this.createJSON({
      type: 'ExportSpecifier',
      local: this.local.toJSON(),
      exported: this.exported.toJSON()
    })
  }
}

module.exports = ExportSpecifier
