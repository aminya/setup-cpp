/** Escape `'` with `\\` */
declare function escapeQuote(input: string): string
/** Escape the given character with the given escape character */
declare function escapeQuote(input: string, character: string, escape_character: string): string

declare module "escape-quotes" {
  export = escapeQuote
}
