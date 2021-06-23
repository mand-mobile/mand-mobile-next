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

export const setLocale = (l: {
  md: {
    action_sheet: { cancel: string }
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
    date_picker: {
      year: string
      month: string
      day: string
      hour: string
      minute: string
      second: string
    }
    dialog: { confirm: string; cancel: string }
    number_keyboard: { confirm: string }
    picker: { confirm: string; cancel: string }
    result_page: {
      networkError: string
      noInformation: string
      lostWay: string
    }
    scroll_view: {
      more: { loading: string; allLoaded: string }
      refresh: {
        pullDownRefresh: string
        freedRefresh: string
        refreshing: string
        success: string
      }
    }
    selector: { cancel: string }
    tab_picker: { choose: string }
  }
}) => {
  lang = l || lang
}

export default { setLocale, t }
