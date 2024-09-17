export function unique(dirs: string[]) {
  return [...new Set(dirs)]
}

export function quoteIfHasSpace(str: string, quoteChar = "\"") {
  return str.includes(" ") ? `${quoteChar}${str}${quoteChar}` : str
}
