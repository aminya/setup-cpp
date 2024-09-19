// the installed @types/node package is version 12 so that backwards compatibility is maintained
// node: prefix is removed by Babel, so define the types of those packages here so that TypeScript can find them

declare module "node:fs" {
  import fs from "fs"
  export = fs
}

declare module "node:path" {
  import path from "path"
  export = path
}

declare module "node:child_process" {
  import child_process from "child_process"
  export = child_process
}

declare module "node:os" {
  import os from "os"
  export = os
}

declare module "node:util" {
  import util from "util"
  export = util
}

declare module "node:stream" {
  import stream from "stream"
  export = stream
}

declare module "node:zlib" {
  import zlib from "zlib"
  export = zlib
}

declare module "node:crypto" {
  import crypto from "crypto"
  export = crypto
}
declare module "node:http" {
  import http from "http"
  export = http
}

declare module "node:https" {
  import https from "https"
  export = https
}

declare module "node:events" {
  import events from "events"
  export = events
}

declare module "node:assert" {
  import assert from "assert"
  export = assert
}

declare module "node:constants" {
  import constants from "constants"
  export = constants
}

declare module "node:querystring" {
  import querystring from "querystring"
  export = querystring
}

declare module "node:url" {
  import url from "url"
  export = url
}

declare module "node:fs/promises" {
  import fsPromises from "fs/promises"
  export = fsPromises
}

declare module "node:path/posix" {
  import pathPosix from "path/posix"
  export = pathPosix
}

declare module "node:path/win32" {
  import pathWin32 from "path/win32"
  export = pathWin32
}
