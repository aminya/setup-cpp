declare module "msvc-dev-cmd/lib.js" {
  export function findVcvarsall(version: string): string
  export function vsversion_to_versionnumber(version: string): string
  export function setupMSVCDevCmd(
    arch: string,
    sdk?: string,
    toolset?: string,
    uwp?: boolean,
    spectre?: boolean,
    vsversion?: string,
  )
}
