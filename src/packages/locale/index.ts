/* istanbul ignore file  */
import defaultLang from './lang/zh-CN'

let lang = defaultLang

function template(
  str: string,
  option: { [x: string]: any }
) {
  if (!str || !option) {
    return str
  }

  return str.replace(
    /\{(\w+)\}/g,
    (match: any, key: string | number) => {
      return option[key]
    }
  )
}

export const t = (path: string, option?: any) => {
  let value
  const array = path.split('.')
  let current: any = lang
  for (let i = 0, j = array.length; i < j; i++) {
    const property = array[i]
    value = current[property]
    if (i === j - 1) {
      return template(value, option)
    }
    if (!value) {
      return ''
    }
    current = value
  }
  return ''
}

export const setLocale = (l: any) => {
  lang = l || lang
}

export default { setLocale, t }
