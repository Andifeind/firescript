const Token = require('./Token')
const PATTERN_KEYS = ['indention', 'comment', 'blockComment', 'regexp', 'operator', 'punctuator', 'literal', 'numeric', 'identifier']
const PATTERN_KEYS_AFTER_COLON_OR_BRACE = ['indention', 'comment', 'blockComment', 'regexp', 'operator', 'punctuator', 'literal', 'numeric', 'keyword', 'identifier']

class PunctuatorToken extends Token {
  constructor (parent, value) {
    super(parent, value)
    this.type = 'punctuator'
    if (value === ':') {
      this.setPattern(PATTERN_KEYS_AFTER_COLON_OR_BRACE)
    } else if (value === '(') {
      this.setPattern(PATTERN_KEYS_AFTER_COLON_OR_BRACE)
    } else {
      this.setPattern(PATTERN_KEYS)
    }
  }
}

module.exports = PunctuatorToken
