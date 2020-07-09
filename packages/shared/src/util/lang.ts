/* istanbul ignore file */
import { mdDocument } from './dom'

export function noop(...args: any[]) {}

/**
 * Include external script dynamically
 */
export function requireRemoteScript(src: string, callback: Function) {
  const doc = mdDocument
  const head = doc.head || doc.getElementsByTagName('head')[0]

  if (!head) {
    return
  }

  let node = doc.createElement('script')
  const supportOnload = 'onload' in node
  const onload = function() {
    node = null
    typeof callback === 'function' && callback()
  }

  if (supportOnload) {
    node.onload = onload
  } else {
    node.onreadystatechange = function() {
      if (/loaded|complete/.test(node.readyState)) {
        onload()
      }
    }
  }

  node.async = true
  node.crossOrigin = true
  node.charset = 'utf-8'
  node.src = src
  head.appendChild(node)
}

export function getDpr() {
  const getParam = (name: string, str: string) => {
    const reg = new RegExp(`(^|,)${name}=([^,]*)(,|$)`, 'i')
    const r = str.match(reg)
    if (r != null) {
      return r[2]
    }
    return null
  }

  const viewPort = mdDocument.querySelector('meta[name=viewport]') || null

  if (!viewPort) {
    return 1
  }

  const viewPortContent = viewPort.getAttribute('content')
  const initialScale = +(getParam('initial-scale', viewPortContent) || 1)
  const maximumScale = +(getParam('maximum-scale', viewPortContent) || 1)
  const minimumScale = +(getParam('minimum-scale', viewPortContent) || 1)

  return 1 / Math.min(initialScale, maximumScale, minimumScale)
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

/**
 * kebab-case -> camelCase
 */
export function transformCamelCase(str: string) {
  var re = /-(\w)/g
  return str.replace(re, function($0, $1) {
    return $1.toUpperCase()
  })
}

/**
 * camelCase -> kebab-case
 */
export function transformKebabCase(str: string) {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
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
    return prev += (prop ? `${transformKebabCase(prop)}:${styles[prop]};` : '')
  }, '')
}

/**
 * Creates a debounced function that delays invoking fn until after delay milliseconds
 */
export function debounce(fn = noop, delay = 300) {
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
export function throttle(fn = noop, interval = 300) {
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
