import { warn } from './debug'
import { hyphenate } from './index'

export function formatValueByGapRule(gapRule: string, value: string, gap = ' ', range: any, isAdd = 1) {
  const arr = value ? value.split('') : []
  let showValue = ''
  const rule = []
  gapRule.split('|').some((n, j) => {
    rule[j] = +n + (rule[j - 1] ? +rule[j - 1] : 0)
  })
  let j = 0
  arr.some((n, i) => {
    // Remove the excess part
    if (i > rule[rule.length - 1] - 1) {
      return
    }
    if (i > 0 && i === rule[j]) {
      showValue = showValue + gap + n
      j++
    } else {
      showValue = showValue + '' + n
    }
  })
  let adapt = 0
  rule.some((n, j) => {
    if (range === +n + 1 + j) {
      adapt = 1 * isAdd
    }
  })
  range = typeof range !== 'undefined' ? (range === 0 ? 0 : range + adapt) : showValue.length
  return {value: showValue, range: range}
}

export function formatValueByGapStep(step, value, gap = ' ', direction = 'right', range, isAdd = 1, oldValue = '') {
  if (value.length === 0) {
    return {value, range}
  }

  const arr = value && value.split('')
  let _range = range
  let showValue = ''

  if (direction === 'right') {
    for (let j = arr.length - 1, k = 0; j >= 0; j--, k++) {
      const m = arr[j]
      showValue = k > 0 && k % step === 0 ? m + gap + showValue : m + '' + showValue
    }
    if (isAdd === 1) {
      // 在添加的情况下，如果添加前字符串的长度减去新的字符串的长度为2，说明多了一个间隔符，需要调整range
      if (oldValue.length - showValue.length === -2) {
        _range = range + 1
      }
    } else {
      // 在删除情况下，如果删除前字符串的长度减去新的字符串的长度为2，说明少了一个间隔符，需要调整range
      if (oldValue.length - showValue.length === 2) {
        _range = range - 1
      }
      // 删除到最开始，range 保持 0
      if (_range <= 0) {
        _range = 0
      }
    }
  } else {
    arr.some((n, i) => {
      showValue = i > 0 && i % step === 0 ? showValue + gap + n : showValue + '' + n
    })
    const adapt = range % (step + 1) === 0 ? 1 * isAdd : 0
    _range = typeof range !== 'undefined' ? (range === 0 ? 0 : range + adapt) : showValue.length
  }

  return {value: showValue, range: _range}
}

export function trimValue(value, gap = ' ') {
  value = typeof value === 'undefined' ? '' : value
  const reg = new RegExp(gap, 'g')
  value = value.toString().replace(reg, '')
  return value
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

