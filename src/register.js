const {addHook} = require('pirates')
const {transform} = require('@babel/core')
const {compile} = require('@riotjs/compiler')

// returns the teardown function
export default () => addHook(
  function(source, filename) {
    const {code} = compile(source, { file: filename })

    return transform(code, {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: 'cjs',
            targets: {
              node: process.versions.node
            }
          }
        ]
      ]
    }).code
  },
  { exts: ['.riot'] }
)