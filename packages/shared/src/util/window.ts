import { inBrowser, root } from './env'

class MDDocument {
  nodeName: string = ''

  constructor(name: string) {
    this.nodeName = name || ''
  }
  appendChild() {}
  removeChild() {}
  querySelector() {}
  addEventListener() {}
  removeEventListener() {}
  createElement() {}
  createEvent() {}
}


let mdDocument

if (inBrowser) {
  mdDocument = (root as any).document
} else {
  mdDocument = new MDDocument('#document')
  mdDocument.body = new MDDocument('BODY')
  mdDocument.documentElement = new MDDocument('HTML')
  ;(root as any).addEventListener = () => {}
  ;(root as any).removeEventListener = () => {}
}

export { mdDocument, MDDocument }

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
