/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as stream from "stream"
import { promisify } from "util"

export const pipeline =
  "promises" in stream && "pipeline" in (stream as any).promises
    ? ((stream.promises as any).pipeline as Function)
    : promisify(stream.pipeline)

export const finished =
  "promises" in stream && "finished" in (stream as any).promises
    ? ((stream.promises as any).finished as Function)
    : promisify(stream.finished)
