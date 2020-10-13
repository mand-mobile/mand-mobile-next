import {root, mdDocument} from '@mand-mobile/shared/lib/util'

class WebDom {
  constructor() {
    this.nodeRef = null
    this.vm = null
  }

  _bindApi(node) {
    if (node) {
      node.element = node
      node.getNode = this.getNode.bind(this)
      node.getScrollOffset = this.getScrollOffset.bind(this)
      node.getComputedStyle = this.getComputedStyle.bind(this)
    }
    return node
  }
  documentElement() {
    this.nodeRef = mdDocument.documentElement
    return this._bindApi(this.nodeRef)
  }
  querySelector(el = '') {
    this.nodeRef = (this.vm || mdDocument).querySelector(el)
    return this._bindApi(this.nodeRef)
  }
  querySelectorAll(el, vm = null) {
    const nodeRef = (this.vm || mdDocument).querySelectorAll(el)
    this.nodeRef = Array.isArray(nodeRef) ? nodeRef : Array.prototype.slice.call(nodeRef)
    return new Proxy(this.nodeRef, {
      get: (target, prop) => {
        const val = target[prop]
        if (!isNaN(prop)) {
          this.nodeRef = val
          return this._bindApi(val)
        }
        return val || this[prop]
      },
    })
  }
  getNode() {
    return this.nodeRef
  }
  getScrollOffset(el) {
    const view = el || this.nodeRef
    const res = {
      scrollLeft: view.scrollLeft,
      scrollTop: view.scrollTop,
    }
    return res
  }
  getComputedStyle(props = [], el) {
    return root.getComputedStyle(el || this.nodeRef)
  }
}

export const Dom = function() {
  const dom = new WebDom()
  dom.vm = this.$el
  return new Proxy(dom, {
    get: (target, prop) => {
      if (prop in target) {
        return target[prop]
      } else {
        return mdDocument[prop]
      }
    },
  })
}
