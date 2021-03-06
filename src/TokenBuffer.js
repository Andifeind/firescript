class TokenBuffer extends Array {
  constructor (items) {
    typeof items === 'number' ? super(items) : super()

    // if (Array.isArray(items)) {
    //   items.forEach((item) => this.push(item))
    // }
    // this.index = 0
    // this.indentionSize = 2
  }

  find (type, value, index = 0) {
    for (let i = index; i < this.length; i++) {
      if (this.match(type, value, i)) {
        return i
      }
    }

    return -1
  }

  match (type, value, index = 0) {
    const token = this[index]
    // console.log('MATCH INDEX', token, type, value, index)
    if (!token) {
      return false
    }

    if (type === 'indention' && value) {
      switch (value) {
        case '>=': return token.value >= token.indention
        case '>': return token.value > token.indention
        case '==': return token.value === token.indention
        case '<': return token.value < token.indention
        case '<=': return token.value <= token.indention
      }

      return false
    }

    if (value && Array.isArray(value)) {
      return value.indexOf(token.value) >= 0
    } else if (value && value instanceof RegExp) {
      return value.test(token.value)
    } else if (value && token.value !== value) {
      return false
    }

    return Array.isArray(type)
      ? type.some((t) => this.matchType(token, t))
      : this.matchType(token, type)
  }

  matchType (token, type) {
    if (type === 'keyword') {
      return token.type === 'identifier' && token.isKeyword
    }

    return token.type === type
  }

  getIndention () {
    return this.length ? this[0].indention : 0
  }

  // match (type, value, offset) {
  //   return this.expect(type, value, this.index + offset)
  // }

  // lastIndention (mode, indention) {
  //   indention = Math.max(indention, 0)
  //
  //   const currentIndention = this.getIndention()
  //   // console.log('INDENTION CHECK', currentIndention, mode, indention)
  //
  //   if (mode === 'eq') {
  //     return currentIndention === indention
  //   } else if (mode === 'lt') {
  //     return currentIndention < indention
  //   } else if (mode === 'lte') {
  //     return currentIndention <= indention
  //   } else if (mode === 'gt') {
  //     return currentIndention > indention
  //   } else if (mode === 'gte') {
  //     return currentIndention >= indention
  //   } else {
  //     throw new Error(`Wrong mode param! '${mode}'`)
  //   }
  // }

  // isIndention (mode, indention, curIndention) {
  //   if (typeof indention === 'object') {
  //     if (indention.type !== 'indention') {
  //       return false
  //     }
  //
  //     indention = indention.value
  //   }
  //
  //   indention = Math.max(indention, 0)
  //   const token = this.current()
  //
  //   if (curIndention === undefined && token && token.type !== 'indention') {
  //     return false
  //   }
  //
  //   const currentIndention = curIndention || (token === null ? 0 : token.value)
  //   // console.log('INDENTION CHECK', currentIndention, mode, indention)
  //
  //   if (mode === 'eq') {
  //     return currentIndention === indention
  //   } else if (mode === 'lt') {
  //     return currentIndention < indention
  //   } else if (mode === 'lte') {
  //     return currentIndention <= indention
  //   } else if (mode === 'gt') {
  //     return currentIndention > indention
  //   } else if (mode === 'gte') {
  //     return currentIndention >= indention
  //   } else {
  //     throw new Error(`Wrong mode param! '${mode}'`)
  //   }
  // }
  //
  // print (msg) {
  //   const startIndex = Math.max(this.index - 2, 0)
  //   const endIndex = Math.min(startIndex + 5, this.length)
  //   // console.log('Len:', this.length)
  //   // console.log('Start:', startIndex)
  //   // console.log('End:', endIndex)
  //   // console.log('Index:', this.index)
  //   // console.log('Stack', this)
  //   const items = this.slice(startIndex, endIndex)
  //   if (msg) {
  //     console.log(` + ${msg}`)
  //   }
  //
  //   // console.log('Items:', items)
  //   items.forEach((item, index) => {
  //     const arrow = this.index - startIndex === index ? '>' : ' '
  //     console.log(`${arrow}| ${item.type} ${item.value}`)
  //   })
  // }
  //
  // lastItem () {
  //   return this.index >= this.length - 1
  // }
  //
  // changeType (type) {
  //   this[this.index].type = type
  // }
}

module.exports = TokenBuffer
