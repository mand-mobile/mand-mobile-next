/* eslint-disable @typescript-eslint/no-this-alias */
import { noop } from './lang'
import { inBrowser } from './env'

export const no = () => false
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
