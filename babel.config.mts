import type { TransformOptions } from "@babel/core"
// @ts-expect-error no types
import RemoveNodePrefix from "@upleveled/babel-plugin-remove-node-prefix"

const babelConfig: TransformOptions = {
  plugins: [
    RemoveNodePrefix,
  ],
  sourceMaps: true,
  sourceType: "module",
}
export default babelConfig
