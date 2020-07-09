import { noop } from './lang'
import { warn } from './debug'
/**
 * Mix properties into target object.
 */
export function extend(to: object, _from: object) {
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}

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
export function traverse(data, childrenKeys = [], fn = noop) {
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
 * Merge an Array of Objects into a single Object.
 */
export function toObject<T extends object>(arr: Array<T>) {
  const res = {}
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i])
    }
  }
  return res
}

/**
 * Convert an Array-like object to a real Array.
 */
export function toArray<T = any>(list: ArrayLike<T>, start: number = 0) {
  let i = list.length - start
  const ret = []
  while (i--) {
    ret.unshift(list[i + start])
  }
  return ret
}

/**
 * whether item is in list or list equal item
 */
export function inArray<T = any>(list: ArrayLike<T>, item: any) {
  return Array.isArray(list) ? !!~list.indexOf(item) : item === list
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
export function toNumber(val: any) {
  const n = parseFloat(val)
  return isNaN(n) ? val : n
}

/**
 * Convert a value to a string
 */
export function toString(val: unknown) {
  return val == null ? '' : typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val)
}

/**
 * Determine whether the two objects are equal or not shallowly
 */

export function compareObjects(object0: unknown, object1: unknown) {
  let ret = true

  if (!object0 || !object1) {
    ret = false
  } else if (typeof object0 !== 'object' || typeof object1 !== 'object') {
    ret = false
  } else if (JSON.stringify(object0) !== JSON.stringify(object1)) {
    ret = false
  }

  return ret
}

/**
 * Check object is empty
 */
export function isEmptyObject(obj: object) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false
    }
  }
  return true
}

export function isPlainObject(obj: unknown) {
  return typeof obj === 'object' && obj !== null
}
