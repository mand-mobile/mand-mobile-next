import defaultLang from './lang/zh-cn'

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

export const setLocale = (l: {
  name: string
  md: {
    'action-sheet': { cancel: string }
    captcha: { sendCaptcha: string; countdown: string }
    cashier: {
      payCash: string
      confirmPay: string
      morePayWays: string
      pay: string
      payResultSearch: string
      paySuccess: string
      payFail: string
      confirm: string
    }
    'date-picker': {
      year: string
      month: string
      day: string
      hour: string
      minute: string
    }
    dialog: { confirm: string; cancel: string }
    'number-keyboard': { confirm: string }
    picker: { confirm: string; cancel: string }
    'result-page': {
      networkError: string
      noInformation: string
      lostWay: string
    }
    'scroll-view': {
      more: { loading: string; allLoaded: string }
      refresh: {
        pullDownRefresh: string
        freedRefresh: string
        refreshing: string
        success: string
      }
    }
    selector: { cancel: string }
    'tab-picker': { choose: string }
  }
}) => {
  lang = l || lang
}

export default { setLocale, t }
