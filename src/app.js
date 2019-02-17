const path = require('path')
const fs = require('fs')
const FirescriptTokenizer = require('./FirescriptTokenizer')
const FirescriptParser = require('./FirescriptParser')
const JSParser = require('./JSParser')
const FirescriptTranspiler = require('./FirescriptTranspiler')
const JSTranspiler = require('./JSTranspiler')
const FSConfig = require('./utils/FSConfig')

module.exports = {
  FirescriptTokenizer,
  FirescriptParser,
  FirescriptTranspiler,
  JSTranspiler,
  JSParser,
  tokenize (input, opts) {
    const tokenizer = new FirescriptTokenizer(opts)
    return tokenizer.tokenize(input)
  },
  transpileFile (filename, opts = {}) {
    const ext = path.extname(filename)
    opts.type = opts.type || ext === '.fire' ? 'fire' : 'js'
    return this.transpile(fs.readFileSync(filename, 'utf8'), opts)
  },
  transpile (input, opts) {
    opts = Object.assign({
      type: 'fire'
    }, opts || {})

    let ast

    if (typeof input === 'string') {
      if (opts.verbose) console.log(`[TRANSPILER] Transpile source into ${opts.type === 'fire' ? 'Javascript' : 'Firescript'}`)
      const parser = opts.type === 'js' ? new JSParser(opts) : new FirescriptParser(opts)
      ast = parser.parse(input)
    } else {
      if (opts.verbose) console.log(`[TRANSPILER] Transpile AST into ${opts.type === 'fire' ? 'Javascript' : 'Firescript'}`)
      ast = input
    }

    const transpiler = opts.type === 'js' ? new FirescriptTranspiler(opts) : new JSTranspiler(opts)
    return transpiler.transpile(ast)
  },
  parse (input, opts) {
    opts = opts || {}
    const parser = opts.type === 'js' ? new JSParser(opts) : new FirescriptParser(opts)
    return parser.parse(input)
  },
  loadConf (customConf) {
    const config = new FSConfig()
    return config.merge(customConf)
  }
}
