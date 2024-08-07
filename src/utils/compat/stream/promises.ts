/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as stream from "stream"
import { promisify } from "util"

// biome-ignore lint: lint/complexity/noBannedTypes
export const pipeline = "promises" in stream && "pipeline" in (stream as any).promises
  // biome-ignore lint: lint/complexity/noBannedTypes
  ? ((stream.promises as any).pipeline as Function)
  : promisify(stream.pipeline)

// biome-ignore lint: lint/complexity/noBannedTypes
export const finished = "promises" in stream && "finished" in (stream as any).promises
  // biome-ignore lint: lint/complexity/noBannedTypes
  ? ((stream.promises as any).finished as Function)
  : promisify(stream.finished)
