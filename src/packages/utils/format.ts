export function transformDate(dateStr: string | Date) {
  if (typeof dateStr === 'string') {
    return new Date(dateStr)
  }
  return dateStr
}

/**
 * kebab-case -> camelCase
 */
export function transformCamelCase(str: string) {
  const re = /-(\w)/g
  return str.replace(re, function ($0, $1) {
    return $1.toUpperCase()
  })
}
