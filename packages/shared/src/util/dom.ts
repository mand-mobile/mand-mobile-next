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

export {mdDocument, MDDocument}
