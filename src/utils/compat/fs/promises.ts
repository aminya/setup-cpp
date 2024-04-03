import * as fs from "fs"
export default fs.promises

export const {
  access,
  appendFile,
  chmod,
  chown,
  copyFile,
  lchmod,
  lchown,
  link,
  lstat,
  mkdir,
  mkdtemp,
  open,
  readdir,
  readFile,
  readlink,
  realpath,
  rename,
  rmdir,
  stat,
  symlink,
  truncate,
  unlink,
  utimes,
  writeFile,
} = fs.promises

import { promisify } from "util"
export const rm = "rm" in fs.promises
  ? (
    fs.promises as typeof fs.promises & {
      rm: (path: string, options?: fs.RmDirOptions) => Promise<void>
    }
  ).rm
  : promisify(fs.unlink)
