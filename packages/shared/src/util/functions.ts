import { warn } from './debug'
import { hyphenate } from './index'

export const NOOP = () => {}

export const NO = () => false

/**
 * Creates a debounced function that delays invoking fn until after delay milliseconds
 */
export function debounce(fn = NOOP, delay = 300) {
  let timer = null

  return function() {
    let context = this
    const args = arguments

    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(function() {
      fn.apply(context, args)
    }, delay)
  }
}

/**
 * Creates a throttled function that only invokes fn at most once per every interval milliseconds
 */
export function throttle(fn = NOOP, interval = 300) {
  let last = 0

  return function() {
    let context = this
    const now = Date.now()

    if (now - last > interval) {
      last = now
      fn.apply(context, arguments)
    }
  }
}

/**
 * simple deep clone by JSON
 * @param data unknown
 */

export function cloneJSON(data: unknown) {
  try {
    return JSON.parse(JSON.stringify(data))
  } catch(e) {
    warn(e.message)
  }
}

/**
 * Multiple Array traversal
 * @return 1 continue
 * @return 2 break
 */
export function traverse(data, childrenKeys = [], fn: any) {
  if (!data) {
    return
  }
  if (typeof childrenKeys === 'function') {
    fn = childrenKeys
    childrenKeys = []
  }
  let level = 0 // current level
  let indexs = [] // index set of all levels
  const walk = curData => {
    for (let i = 0, len = curData.length; i < len; i++) {
      const isArray = Array.isArray(curData[i])
      const key = Array.isArray(childrenKeys) ? childrenKeys[level] : childrenKeys
      if (isArray || (curData[i] && curData[i][key])) {
        level++
        indexs.push(i)
        walk(isArray ? curData[i] : curData[i][key])
      } else if (level >= childrenKeys.length) {
        const res = fn(curData[i], level, [...indexs, i]) as unknown
        if (res === 1) {
          continue
        } else if (res === 2) {
          break
        }
      } else {
        continue
      }
    }
    level = 0
    indexs = []
  }
  walk(data)
}

/**
 * transform a Function to Blob Url
 */
export function functionToUrl(fn: Function) {
  const blob = new Blob([`(${fn.toString()})(null)`], {type: 'application/javascript'})
  return URL.createObjectURL(blob)
}

/**
 * generate random id
 */
export function randomId(prefix = '', length = 8) {
  return process.env.NODE_ENV !== 'test'
    ? `${prefix}-${parseInt('' + Math.random() * Math.pow(10, length))}`
    : ''
}

export function transformDate(dateStr: string | Date) {
  if (typeof dateStr === 'string') {
    return new Date(dateStr)
  }
  return dateStr
}

export function flatStyleObject(styles = {}) {
  if (!styles) {
    return ''
  }
  return Object.keys(styles).reduce((prev, prop) => {
    return prev += (prop ? `${hyphenate(prop)}:${styles[prop]};` : '')
  }, '')
}
