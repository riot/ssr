import {addHook} from 'pirates'
import {compile} from '@riotjs/compiler'
import {transform} from '@babel/core'

// returns the teardown function
export default (options) => addHook(
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
  Object.assign({ exts: ['.riot'], ignoreNodeModules: false }, options)
)
