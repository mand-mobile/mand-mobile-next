import { inBrowser } from 'vitepress'

export const useCurrentPath = (path: string, toggle = false) => {
  if (!inBrowser) return path

  const pathName = window.location.pathname

  const ZH = '/zh-CN/'
  const EN = '/en-US/'
  const PATH_RE = /^\/\w+\-\w+\//

  if (isZh(pathName)) {
    return path.replace(PATH_RE, toggle ? EN : ZH)
  } else if (isEn(pathName)) {
    return path.replace(PATH_RE, toggle ? ZH : EN)
  } else {
    return path
  }
}

export function isZh(path: string) {
  const ZH = '/zh-CN/'

  return path.startsWith(ZH)
}

export function isEn(path: string) {
  const EN = '/en-US/'

  return path.startsWith(EN)
}
