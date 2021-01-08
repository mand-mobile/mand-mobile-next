import {root, inBrowser} from './env'

export const noop = () => {}

export const no = () => false

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

export function getNow() {
  return root.performance && root.performance.now && root.performance.timing
    ? root.performance.now() + root.performance.timing.navigationStart
    : +new Date()
}

export const requestAnimationFrame = (() => {
  // Check for request animation Frame support
  const requestFrame =
    root.requestAnimationFrame ||
    root.webkitRequestAnimationFrame ||
    root.mozRequestAnimationFrame ||
    root.oRequestAnimationFrame

  let isNative = !!requestFrame

  if (requestFrame && !/requestAnimationFrame\(\)\s*\{\s*\[native code\]\s*\}/i.test(requestFrame.toString())) {
    isNative = false
  }

  if (isNative) {
    return requestFrame
  }

  const TARGET_FPS = 60
  let requests = {}
  let requestCount = 0
  let rafHandle = 1
  let intervalHandle = null
  let lastActive = getNow()

  return callback => {
    const callbackHandle = rafHandle++

    // Store callback
    requests[callbackHandle] = callback
    requestCount++

    // Create timeout at first request
    if (intervalHandle === null) {
      intervalHandle = setInterval(() => {
        const time = getNow()
        const currentRequests = requests

        // Reset data structure before executing callbacks
        requests = {}
        requestCount = 0

        for (const key in currentRequests) {
          if (currentRequests.hasOwnProperty(key)) {
            currentRequests[key](time)
            lastActive = time
          }
        }

        // Disable the timeout when nothing happens for a certain
        // period of time
        if (time - lastActive > 2500) {
          clearInterval(intervalHandle)
          intervalHandle = null
        }
      }, 1000 / TARGET_FPS)
    }
    return callbackHandle
  }
})()

export const cancelAnimationFrame = (() => {
  if (!inBrowser) {
    /* istanbul ignore if */
    return noop
  }
  return (
    root.cancelAnimationFrame ||
    root.webkitCancelAnimationFrame ||
    root.mozCancelAnimationFrame ||
    root.oCancelAnimationFrame ||
    function(id: number) {
      root.clearTimeout(id)
    }
  )
})()