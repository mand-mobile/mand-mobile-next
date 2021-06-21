type IData = Array<{
  text: string
  options: Array<{
    value: string
    text: string
  }>
  [key: string]: any
}>

export function traverse(
  data: IData,
  childrenKeys: string[] = [],
  fn: (...res: Array<any>) => unknown
) {
  if (!data) {
    return
  }
  if (typeof childrenKeys === 'function') {
    fn = childrenKeys
    childrenKeys = []
  }
  let level = 0 // current level
  let indexs: number[] = [] // index set of all levels
  const walk = (curData: IData) => {
    for (let i = 0, len = curData.length; i < len; i++) {
      const isArray = Array.isArray(curData[i])
      const key = Array.isArray(childrenKeys)
        ? childrenKeys[level]
        : childrenKeys
      if (isArray || (curData[i] && curData[i][key])) {
        level++
        indexs.push(i)
        walk(isArray ? curData[i] : curData[i][key])
      } else if (level >= childrenKeys.length) {
        const res = fn(curData[i], level, [...indexs, i])
        if (res) {
          continue
        } else {
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

export function compareObjects(
  object0: Record<string, any>,
  object1: Record<string, any>
) {
  let result = true
  if (!object0 || !object1) {
    result = false
  } else if (
    typeof object0 !== 'object' ||
    typeof object1 !== 'object'
  ) {
    result = false
  } else if (
    JSON.stringify(object0) !== JSON.stringify(object1)
  ) {
    result = false
  }
  return result
}

export function compareArrays(
  arr0: Array<unknown>,
  arr1: Array<unknown>
) {
  if (arr0.length !== arr1.length) {
    return false
  }
  let result = true
  for (let i = 0; i < arr0.length; i++) {
    if (!deepEquals(arr0[i], arr1[i])) {
      result = false
    }
  }
  return result
}

export function deepEquals(a: unknown, b: unknown) {
  if (a instanceof Array && b instanceof Array)
    return compareArrays(a, b)
  if (
    Object.getPrototypeOf(a) === Object.prototype &&
    Object.getPrototypeOf(b) === Object.prototype
  )
    return compareObjects(a, b)
  return a === b
}

/**
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/sign
 * 此函数共有5种返回值, 分别是 1, -1, 0, -0, NaN. 代表的各是正数, 负数, 正零, 负零, NaN。
 * @param x
 * @returns
 */
export const MathSign = function (x: string | number) {
  const n = +x // convert to a number
  if (!Math.sign) {
    if (n === 0 || isNaN(n)) {
      return n
    }
    return x > 0 ? 1 : -1
  }
  return Math.sign(n)
}
