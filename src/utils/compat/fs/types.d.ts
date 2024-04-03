declare module "fs/promises" {
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
}
