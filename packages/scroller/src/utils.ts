// @ts-nocheck
const {
  noop,
  root,
  mdDocument,
  inBrowser,
  isWeChatDevTools,
  extend
} = require('@mand-mobile/shared/lib/util')

export const enum Probe {
  Default,
  Throttle,
  Normal,
  Realtime
}

export const enum EventType {
  Touch = 1,
  Mouse = 2
}

export const enum MouseButton {
  Left,
  Middle,
  Right
}

export const enum EventPassthrough {
  None = '',
  Horizontal = 'horizontal',
  Vertical = 'vertical'
}

export const enum Direction {
  Positive = 1, // bottom to top and right to left
  Negative = -1, // top to bottom and left to right
  Default = 0
}

export const enum DirectionLock {
  Default = '',
  Horizontal = 'horizontal',
  Vertical = 'vertical',
  None = 'none'
}

export const eventTypeMap: {
  [key: string]: number
  touchstart: number
  touchmove: number
  touchend: number
  mousedown: number
  mousemove: number
  mouseup: number
} = {
  touchstart: 1,
  touchmove: 1,
  touchend: 1,

  mousedown: 2,
  mousemove: 2,
  mouseup: 2,
  mouseleave: 2
}

export interface MountedBScrollHTMLElement extends HTMLElement {
  isBScrollContainer?: boolean
}

export function getElement(el: HTMLElement | string) {
  return (typeof el === 'string'
    ? mdDocument.querySelector(el)
    : el) as HTMLElement
}


export type safeCSSStyleDeclaration = {
  [key: string]: string
} & CSSStyleDeclaration

let elementStyle = (inBrowser &&
  mdDocument.createElement('div').style) as safeCSSStyleDeclaration

let vendor = (() => {
  if (!inBrowser) {
    return false
  }
  let transformNames: {
    [prefix: string]: string
  } = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

function prefixStyle(style: string): string {
  if (vendor === false) {
    return style
  }

  if (vendor === 'standard') {
    if (style === 'transitionEnd') {
      return 'transitionend'
    }
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}

let transform = prefixStyle('transform')
let transition = prefixStyle('transition')

export const hasPerspective =
  inBrowser && prefixStyle('perspective') in elementStyle
// fix issue #361
export const hasTouch =
  inBrowser && ('ontouchstart' in root || isWeChatDevTools)
export const hasTransition = inBrowser && transition in elementStyle

export const style = {
  transform,
  transition,
  transitionTimingFunction: prefixStyle('transitionTimingFunction'),
  transitionDuration: prefixStyle('transitionDuration'),
  transitionDelay: prefixStyle('transitionDelay'),
  transformOrigin: prefixStyle('transformOrigin'),
  transitionEnd: prefixStyle('transitionEnd')
}

export function getRect(el: HTMLElement): Partial<DOMRect> {
  if (el instanceof (window as any).SVGElement) {
    let rect = el.getBoundingClientRect()
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    }
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    }
  }
}

export interface TouchList {
  length: number
  [index: number]: Touch
  item: (index: number) => Touch
}

export interface Touch {
  identifier: number
  target: EventTarget
  screenX: number
  screenY: number
  clientX: number
  clientY: number
  pageX: number
  pageY: number
}

export interface TouchEvent extends UIEvent {
  touches: TouchList
  targetTouches: TouchList
  changedTouches: TouchList
  altKey: boolean
  metaKey: boolean
  ctrlKey: boolean
  shiftKey: boolean
  rotation: number
  scale: number
  button: number
  _constructed?: boolean
}

export function preventDefaultExceptionFn(
  el: any,
  exceptions: {
    tagName?: RegExp
    className?: RegExp
    [key: string]: any
  }
) {
  for (let i in exceptions) {
    if (exceptions[i].test(el[i])) {
      return true
    }
  }
  return false
}

export const tagExceptionFn = preventDefaultExceptionFn

export function isUndef(v: any): boolean {
  return v === undefined || v === null
}

export function tap(e: any, eventName: string) {
  let ev = mdDocument.createEvent('Event') as any
  if (!ev) {
    return
  }
  ev.initEvent(eventName, true, true)
  ev.pageX = e.pageX
  ev.pageY = e.pageY
  e.target.dispatchEvent(ev)
}

export function click(e: any, event = 'click') {
  let eventSource
  if (e.type === 'mouseup') {
    eventSource = e
  } else if (e.type === 'touchend' || e.type === 'touchcancel') {
    eventSource = e.changedTouches[0]
  }
  let posSrc: {
    screenX?: number
    screenY?: number
    clientX?: number
    clientY?: number
  } = {}
  if (eventSource) {
    posSrc.screenX = eventSource.screenX || 0
    posSrc.screenY = eventSource.screenY || 0
    posSrc.clientX = eventSource.clientX || 0
    posSrc.clientY = eventSource.clientY || 0
  }
  let ev: any
  const bubbles = true
  const cancelable = true
  if (typeof MouseEvent !== 'undefined') {
    try {
      ev = new MouseEvent(
        event,
        extend(
          {
            bubbles,
            cancelable
          },
          posSrc
        )
      )
    } catch (e) {
      createEvent()
    }
  } else {
    createEvent()
  }

  function createEvent() {
    ev = mdDocument.createEvent('Event')
    if (!ev) {
      return
    }
    ev.initEvent(event, bubbles, cancelable)
    extend(ev, posSrc)
  }

  // forwardedTouchEvent set to true in case of the conflict with fastclick
  ev.forwardedTouchEvent = true
  ev._constructed = true
  e.target.dispatchEvent(ev)
}

export function dblclick(e: Event) {
  click(e, 'dblclick')
}