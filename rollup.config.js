import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: 'src/index.js',
  external: ['riot'],
  plugins: [
    nodeResolve(),
    commonjs({
      esmExternals: ['riot'],
    }),
  ],
  output: [
    {
      format: 'cjs',
      file: 'index.cjs',
    },
    {
      format: 'esm',
      file: 'index.js',
    },
  ],
}
