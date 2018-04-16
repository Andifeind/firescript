const path = require('path')
const inspect = require('inspect.js')
const JSTranspiler = require('../../').JSTranspiler

const TEST_CASE_DIR = path.join(__dirname, '../fixtures/lang')

describe('JSTranspiler', () => {
  describe('transpile', () => {
    const testCases = inspect.readDir(TEST_CASE_DIR)
    let group

    testCases.forEach((testCase) => {
      if (testCase.isDirectory()) {
        group = testCase.name

        it(`${group} into Javascript from AST`, () => {
          const ast = require(`${testCase.path}/ast.json`)
          const source = inspect.readFile(`${testCase.path}/index.js`)
          const featureConf = inspect.readJSON(`${testCase.path}/conf.json`, { silent: true })
          const transpiler = new JSTranspiler({
            features: featureConf
          })

          const jsSource = transpiler.transpile(ast)
          inspect(jsSource).isString()
          inspect(jsSource).isEql(source)
        })
      }
    })
  })
})
