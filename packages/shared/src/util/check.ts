const hasOwnProperty = Object.prototype.hasOwnProperty
export const hasOwn = (
  val: object,
  key: string | symbol
): key is keyof typeof val => hasOwnProperty.call(val, key)

export const isArray = Array.isArray
export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function'
export const isString = (val: unknown): val is string => typeof val === 'string'
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'

export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}


export const objectToString = Object.prototype.toString
export const toTypeString = (value: unknown): string =>
  objectToString.call(value)

export const isPlainObject = (val: unknown): val is object =>
  toTypeString(val) === '[object Object]'

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

/**
 * whether item is in list or list equal item
 */
export function inArray<T = any>(list: ArrayLike<T>, item: any) {
  return Array.isArray(list) ? !!~list.indexOf(item) : item === list
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
