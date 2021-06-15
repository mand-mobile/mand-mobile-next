export function noop() {}

/**
 * kebab-case -> camelCase
 */
export function transformCamelCase(str: string) {
  const re = /-(\w)/g
  return str.replace(re, function ($0, $1) {
    return $1.toUpperCase()
  })
}

/**
 * generate random id
 */
export function randomId(prefix = '', length = 8) {
  return `${prefix}-${parseInt(
    `${Math.random() * Math.pow(10, length)}`
  )}`
}

/**
 * transform a Function to Blob Url
 */
export function functionToUrl(fn: (options: any) => void) {
  const blob = new Blob([`(${fn.toString()})(null)`], {
    type: 'application/javascript',
  })
  return URL.createObjectURL(blob)
}
