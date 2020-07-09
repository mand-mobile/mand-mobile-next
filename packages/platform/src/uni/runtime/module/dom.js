import {MDDocument} from '@mand-mobile/shared/lib/util'

const PropList = {
  id: 'id',
  clientWidth: 'width',
  offsetWidth: 'width',
  clientHeight: 'width',
  offsetHeight: 'height'
}

class UniDom extends MDDocument {
  // nodeRef = null
  // nodeRefIndex = null
  // vm = null

  _bindApi (node) {
    if (node) {
      node.element = node._selector || ''
      node.getNode = this.getNode.bind(this)
      node.getAttribute = this.getAttribute.bind(this)
      node.getBoundingClientRect = this.getBoundingClientRect.bind(this)
      node.getScrollOffset = this.getScrollOffset.bind(this)
      node.getComputedStyle = this.getComputedStyle.bind(this)
    }
    return node
  }

  documentElement() {
    this.nodeRefIndex = null
    this.nodeRef = uni.createSelectorQuery().in(this.vm).selectViewport()
    return this._bindApi(this.nodeRef)
  }
  querySelector (el) { 
    this.nodeRefIndex = null
    this.nodeRef = uni.createSelectorQuery().in(this.vm).select(el)
    return this._bindApi(this.nodeRef)
  }
  querySelectorAll (el) {
    this.nodeRefIndex = null
    this.nodeRef = uni.createSelectorQuery().in(this.vm).selectAll(el)
    const nodeRef = this._bindApi(this.nodeRef)
    return new Proxy(nodeRef, {
      get: (target, prop) => {
        if (!isNaN(prop)) {
          this.nodeRefIndex = prop
        }
        return target[prop] || nodeRef
      }
    })
  }
  getNode () {
    return new Promise(resolve => {
      this.nodeRef.node(data => {
        if (this.nodeRefIndex !== null) {
          data = data[this.nodeRefIndex]
        }
        resolve(this._bindApi(data.node))
      }).exec()
    })
  }
  getAttribute (key = '', el) {
    return new Promise(resolve => {
      (el || this.nodeRef).fields({
        id: true,
        properties: [key]
      }, data => {
        if (this.nodeRefIndex !== null) {
          data = data[this.nodeRefIndex]
        }
        resolve(data[key])
      }).exec()
    })
  }
  getBoundingClientRect (el) {
    return new Promise(resolve => {
      (el || this.nodeRef).boundingClientRect(data => {
        if (this.nodeRefIndex !== null) {
          data = data[this.nodeRefIndex]
        }
        resolve(data)
      }).exec()
    })
  }
  getScrollOffset (el) {
    return new Promise(resolve => {
      (el || this.nodeRef).scrollOffset(data => {
        if (this.nodeRefIndex !== null) {
          data = data[this.nodeRefIndex]
        }
        resolve(data)
      }).exec()
    })
  }
  getComputedStyle (props = [], el) {
    return new Promise(resolve => {
      (el || this.nodeRef).fields({
        computedStyle: props
      }, data => {
        if (this.nodeRefIndex !== null) {
          data = data[this.nodeRefIndex]
        }
        resolve(data)
      }).exec()
    })
  }
}

export const Dom = function () {
  const dom = new UniDom()
  dom.vm = this
  return new Proxy(dom, {
    get: (target, prop) => {
      return target[prop]
    }
  })
}