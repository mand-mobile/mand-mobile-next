/* eslint-disable @typescript-eslint/no-this-alias */
import { inBrowser } from './env'

export const no = () => false

export function noop() {}

/**
 * Creates a debounced function that delays invoking fn until after delay milliseconds
 */
export function debounce(fn = noop, delay = 300) {
  let timer: any = null

  return function (this: any) {
    const context = this
    const args = arguments

    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(function () {
      fn.apply(context, args as any)
    }, delay)
  }
}

/**
 * Creates a throttled function that only invokes fn at most once per every interval milliseconds
 */
export function throttle(fn: any = noop, interval = 300) {
  let last = 0

  return function (this: any) {
    const context = this
    const now = Date.now()

    if (now - last > interval) {
      last = now
      fn.apply(context, arguments as any)
    }
  }
}

export function getDpr() {
  const getParam = (name: string, str: string | null) => {
    const reg = new RegExp(`(^|,)${name}=([^,]*)(,|$)`, 'i')
    const r = str && str.match(reg)
    if (r != null) {
      return r[2]
    }
    return null
  }

  const viewPort = inBrowser
    ? document.querySelector('meta[name=viewport]')
    : null

  if (!viewPort) {
    return 1
  }

  const viewPortContent = viewPort.getAttribute('content')
  const initialScale = +(
    getParam('initial-scale', viewPortContent) || 1
  )
  const maximumScale = +(
    getParam('maximum-scale', viewPortContent) || 1
  )
  const minimumScale = +(
    getParam('minimum-scale', viewPortContent) || 1
  )

  return (
    1 / Math.min(initialScale, maximumScale, minimumScale)
  )
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

/**
 * Convert an Array-like object to a real Array.
 */
export function toArray<T = any>(
  list: ArrayLike<T>,
  start = 0
) {
  let i = list.length - start
  const ret = []
  while (i--) {
    ret.unshift(list[i + start])
  }
  return ret
}

/**
 * Merge an Array of Objects into a single Object.
 */
export function toObject<T extends Record<string, unknown>>(
  arr: Array<T>
) {
  const res = {}
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      Object.assign(res, arr[i])
    }
  }
  return res
}
