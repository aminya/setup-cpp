import { promises } from "fs"
export default promises

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
} = promises
