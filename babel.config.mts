import type { TransformOptions } from "@babel/core"
// @ts-ignore
import RemoveNodePrefix from "@upleveled/babel-plugin-remove-node-prefix"

const babelConfig: TransformOptions = {
  plugins: [
    RemoveNodePrefix,
  ],
  sourceMaps: true,
  sourceType: "module",
}
export default babelConfig
