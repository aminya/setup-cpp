declare module "numerous" {
  export type Locale = unknown

  /** Adds pluralization data for the specified locale. Should be called in browser. */
  export function addLocale(localeData: Locale | Locale[])
}

declare module "numerous/locales/en.js" {
  import { Locale } from "numerous"

  declare const En = Locale
  export = En
}
