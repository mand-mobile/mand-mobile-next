/*
 * Based on the work of: BetterScroll
 * https://github.com/ustbhuangyi/better-scroll
 *
 * Copyright (c) 2015 HuangYi
 * Licensed under the MIT License.
 * https://raw.github.com/zynga/scroller/master/MIT-LICENSE.txt
 *
 */
import ScrollerOptions, { BounceConfig } from './options'
import Behavior from './behavior'
import DirectionLockAction from './direction-lock'
import Animator, {ease} from './animator'
import EventEmitter from './event'
import {
  isUndef,
  Probe,
  getNow,
  TouchEvent,
  eventTypeMap,
  EventType,
  MountedBScrollHTMLElement,
  MouseButton,
  tagExceptionFn,
  preventDefaultExceptionFn,
  style,
  click,
  tap,
  dblclick
} from './utils'

export interface TranslaterPoint {
  x: number
  y: number
  [key: string]: number
}

export interface TransitionConfig {
  time: number
  easingFn: string
  [key: string]: any
}

interface TranslaterMetaData {
  x: [string, string]
  y: [string, string]
  [key: string]: any
}
const translaterMetaData: TranslaterMetaData = {
  x: ['translateX', 'px'],
  y: ['translateY', 'px']
}

export default class Scroller extends EventEmitter {
  wrapper: HTMLElement | null
  content: HTMLElement | null
  wrapperRect: DOMRect
  contentRect: DOMRect
  options: ScrollerOptions
  scrollBehaviorX: Behavior
  scrollBehaviorY: Behavior
  directionLockAction: DirectionLockAction
  animator: Animator
  animatorId: number
  initiated: number
  moved: boolean
  enabled: boolean
  startTime: number
  endTime: number
  pointX: number
  pointY: number
  resizeTimeout: number
  [key: string]: any

  constructor(wrapper: HTMLElement, content: HTMLElement, options: ScrollerOptions) {
    super([
      'refresh',
      'enable',
      'disable',
      'touchStart',
      'touchMove',
      'touchEnd',
      'beforeScrollStart',
      'scrollStart',
      'scroll',
      'scrollTo',
      'scrollEnd',
      'scrollCancel',
      'translate',
      'checkClick',
      'flick',
      'destroy',
      'ignoreDisMoveForSamePos'
    ])

    this.wrapper = wrapper
    this.content = content
    this.options = new ScrollerOptions().merge(options).process()

    if (typeof wrapper !== 'string') {
      ;(wrapper as any).isBScrollContainer = true
    }

    const { left = true, right = true, top = true, bottom = true } = this.options.bounce as BounceConfig

    // direction X
    this.scrollBehaviorX = new Behavior(
      Behavior.createBehaviorOptions(this.options, 'scrollX', [left, right], {
        size: 'width',
        position: 'left'
      })
    )
    // direction Y
    this.scrollBehaviorY = new Behavior(
      Behavior.createBehaviorOptions(this.options, 'scrollY', [top, bottom], {
        size: 'height',
        position: 'top'
      })
    )

    this.directionLockAction = new DirectionLockAction(
      this.options.directionLockThreshold,
      this.options.freeScroll,
      this.options.eventPassthrough
    )

    this.animator = new Animator()
    this.enabled = true

    this.init()
  }

  private init() {
    this.on(this.eventTypes.scrollEnd, () => {
      this.togglePointerEvents(true)
    })
    this.refresh()
  }

  private setInitiated(type: number = 0) {
    this.initiated = type
  }

  private dispatchScroll(timestamp: number) {
    // dispatch scroll in interval time
    if (timestamp - this.startTime > this.options.momentumLimitTime) {
      // refresh time and starting position to initiate a momentum
      this.startTime = timestamp
      this.scrollBehaviorX.updateStartPos()
      this.scrollBehaviorY.updateStartPos()
      if (this.options.probeType === Probe.Throttle) {
        this.trigger(this.eventTypes.scroll, this.getCurrentPos())
      }
    }

    // dispatch scroll all the time
    if (this.options.probeType > Probe.Throttle) {
      this.trigger(this.eventTypes.scroll, this.getCurrentPos())
    }
  }

  private togglePointerEvents(enabled = true) {
    if (!this.content || !this.content.children) {
      return
    }
    let el = this.content.children.length
      ? this.content.children
      : [this.content]
    let pointerEvents = enabled ? 'auto' : 'none'
    for (let i = 0; i < el.length; i++) {
      let node = el[i] as MountedBScrollHTMLElement
      // ignore BetterScroll instance's wrapper DOM
      if (node.isBScrollContainer) {
        continue
      }
      node.style.pointerEvents = pointerEvents
    }
  }

  private checkMomentum(absDistX: number, absDistY: number, timestamp: number) {
    return (
      timestamp - this.endTime > this.options.momentumLimitTime &&
      absDistY < this.options.momentumLimitDistance &&
      absDistX < this.options.momentumLimitDistance
    )
  }

  private momentum(pos: TranslaterPoint, duration: number) {
    const meta = {
      time: 0,
      easing: ease.bounce,
      newX: pos.x,
      newY: pos.y
    }
    // start momentum animation if needed
    const momentumX = this.scrollBehaviorX.end(duration)
    const momentumY = this.scrollBehaviorY.end(duration)

    meta.newX = isUndef(momentumX.destination)
      ? meta.newX
      : (momentumX.destination as number)
    meta.newY = isUndef(momentumY.destination)
      ? meta.newY
      : (momentumY.destination as number)
    meta.time = Math.max(
      momentumX.duration as number,
      momentumY.duration as number
    )
      
    // this.hooks.trigger(this.hooks.eventTypes.momentum, meta, this)
    // when x or y changed, do momentum animation now!
    if (meta.newX !== pos.x || meta.newY !== pos.y) {
      // change easing function when scroller goes out of the boundaries
      if (
        meta.newX > this.scrollBehaviorX.minScrollPos ||
        meta.newX < this.scrollBehaviorX.maxScrollPos ||
        meta.newY > this.scrollBehaviorY.minScrollPos ||
        meta.newY < this.scrollBehaviorY.maxScrollPos
      ) {
        meta.easing = ease.swipeBounce
        meta.time *= 0.8
      }
      
      this.scrollTo(meta.newX, meta.newY, meta.time, meta.easing.fn)
      return true
    }
  }

  // private checkFlick(duration: number, deltaX: number, deltaY: number) {
  //   // flick
  //   if (
  //     this.events.flick.length > 1 &&
  //     duration < this.options.flickLimitTime &&
  //     deltaX < this.options.flickLimitDistance &&
  //     deltaY < this.options.flickLimitDistance
  //   ) {
  //     return true
  //   }
  // }

  private checkClick(e: TouchEvent) {
    // when in the process of pulling down, it should not prevent click
    const cancelable = {
      preventClick: this.animator.forceStopped
    }

    // we scrolled less than momentumLimitDistance pixels
    if (this.trigger(this.eventTypes.checkClick)) return true
    
    if (!cancelable.preventClick) {
      const _dblclick = this.options.dblclick
      let dblclickTrigged = false
      if (_dblclick && this.lastClickTime) {
        const { delay = 300 } = _dblclick as any
        if (getNow() - this.lastClickTime < delay) {
          dblclickTrigged = true
          dblclick(e)
        }
      }
      if (this.options.tap) {
        tap(e, this.options.tap)
      }
      if (
        this.options.click &&
        !preventDefaultExceptionFn(
          e.target,
          this.options.preventDefaultException
        )
      ) {
        click(e)
      }
      this.lastClickTime = dblclickTrigged ? null : getNow()
      return true
    }
    return false
  }

  private translate(point: TranslaterPoint, transitionConfig?: TransitionConfig) {
    let transformStyle = [] as string[]
    const transformStyleObject: any = {}
    Object.keys(point).forEach(key => {
      if (!translaterMetaData[key]) {
        return
      }
      const transformFnName = translaterMetaData[key][0]
      if (transformFnName) {
        const transformFnArgUnit = translaterMetaData[key][1]
        const transformFnArg = point[key]
        transformStyle.push(
          `${transformFnName}(${transformFnArg}${transformFnArgUnit})`
        )
      }
    })

    if (this.options.translateZ) {
      transformStyle.push(this.options.translateZ)
    }

    transformStyleObject[style.transform] = transformStyle.join(' ')
    
    if (transitionConfig) {
      transformStyleObject[style.transitionDuration] = (transitionConfig.time || 0) + 'ms'
      transformStyleObject[style.transitionTimingFunction] = transitionConfig.easingFn || ''
    }

    // console.log(style.transform, transformStyle.join(' '))
    this.scrollBehaviorX.updatePosition(point.x)
    this.scrollBehaviorY.updatePosition(point.y)

    this.togglePointerEvents(false)

    this.trigger(this.eventTypes.translate, point, transformStyleObject)
  }

  private beforeHandler(e: TouchEvent, type: 'start' | 'move' | 'end') {
    const {
      preventDefault,
      stopPropagation,
      preventDefaultException
    } = this.options

    const preventDefaultConditions = {
      start: () => {
        return (
          preventDefault &&
          !preventDefaultExceptionFn(e.target, preventDefaultException)
        )
      },
      end: () => {
        return (
          preventDefault &&
          !preventDefaultExceptionFn(e.target, preventDefaultException)
        )
      },
      move: () => {
        return preventDefault
      }
    }

    if (preventDefaultConditions[type]()) {
      e.preventDefault()
    }

    if (stopPropagation) {
      e.stopPropagation()
    }
  }

  // private resize() {
  //   if (!this.enabled) {
  //     return
  //   }

  //   // fix a scroll problem under Android condition
  //   if (isAndroid && this.wrapper) {
  //     this.wrapper.scrollTop = 0
  //   }
  //   // if (!this.hooks.trigger(this.hooks.eventTypes.resize)) {
  //   clearTimeout(this.resizeTimeout)
  //   this.resizeTimeout = window.setTimeout(() => {
  //     this.refresh()
  //   }, this.options.resizePolling)
  //   // }
  // }

  handleStart(e: TouchEvent) {
    const _eventType = eventTypeMap[e.type]
    
    if (!this.enabled || (this.initiated && this.initiated !== _eventType)) {
      return
    }
    this.setInitiated(_eventType)
    
    // if textarea or other html tags in options.tagException is manipulated
    // do not make bs scroll
    if (tagExceptionFn(e.target, this.options.tagException)) {
      this.setInitiated()
      return
    }
    
    // no mouse left button
    if (_eventType === EventType.Mouse && e.button !== MouseButton.Left) return

    this.beforeHandler(e, 'start')

    let point = (e.touches ? e.touches[0] : e) as Touch
    this.pointX = point.pageX
    this.pointY = point.pageY

    this.trigger(this.eventTypes.touchStart)

    const timestamp = getNow()
    this.moved = false

    this.startTime = timestamp

    this.directionLockAction.reset()

    this.scrollBehaviorX.start()
    this.scrollBehaviorY.start()

    // force stopping last transition or animation
    this.animator.stop(this.animatorId)

    this.scrollBehaviorX.resetStartPos()
    this.scrollBehaviorY.resetStartPos()
    
    this.trigger(this.eventTypes.beforeScrollStart, e)
  }

  handleMove(e: TouchEvent) {
    if (!this.enabled || (eventTypeMap[e.type] !== this.initiated)) {
      return
    }
    
    this.beforeHandler(e, 'move')
    
    const point = (e.touches ? e.touches[0] : e) as Touch
    const deltaX = point.pageX - this.pointX
    const deltaY = point.pageY - this.pointY
    this.pointX = point.pageX
    this.pointY = point.pageY

    const absDistX = this.scrollBehaviorX.getAbsDist(deltaX)
    const absDistY = this.scrollBehaviorY.getAbsDist(deltaY)
    const timestamp = getNow()

    // We need to move at least momentumLimitDistance pixels
    // for the scrolling to initiate
    if (this.checkMomentum(absDistX, absDistY, timestamp)) {
      return true
    }
    if (this.directionLockAction.checkMovingDirection(absDistX, absDistY, e)) {
      this.setInitiated()
      return true
    }

    const delta = this.directionLockAction.adjustDelta(deltaX, deltaY)
    
    const newX = this.scrollBehaviorX.move(delta.deltaX)
    const newY = this.scrollBehaviorY.move(delta.deltaY)

    this.trigger(this.eventTypes.touchMove)

    if (!this.moved) {
      this.moved = true
      this.trigger(this.eventTypes.scrollStart)
    }
    
    this.translate({
      x: newX,
      y: newY
    })
    
    this.dispatchScroll(timestamp)

    // TODO 
    // auto end when out of wrapper
    // let scrollLeft =
    //   document.documentElement.scrollLeft ||
    //   window.pageXOffset ||
    //   document.body.scrollLeft
    // let scrollTop =
    //   document.documentElement.scrollTop ||
    //   window.pageYOffset ||
    //   document.body.scrollTop

    // let pX = this.pointX - scrollLeft
    // let pY = this.pointY - scrollTop

    // if (
    //   pX >
    //     document.documentElement.clientWidth -
    //       this.options.momentumLimitDistance ||
    //   pX < this.options.momentumLimitDistance ||
    //   pY < this.options.momentumLimitDistance ||
    //   pY >
    //     document.documentElement.clientHeight -
    //       this.options.momentumLimitDistance
    // ) {
    //   this.handleEnd(e)
    // }
  }

  handleEnd(e: TouchEvent) {
    if (!this.enabled || (eventTypeMap[e.type] !== this.initiated)) {
      return
    }
    this.setInitiated()

    this.beforeHandler(e, 'end')

    const currentPos = this.getCurrentPos()

    this.scrollBehaviorX.updateDirection()
    this.scrollBehaviorY.updateDirection()
    
    this.trigger(this.eventTypes.touchEnd)

    // check if it is a click operation
    if (!this.moved && this.checkClick(e)) {
      this.animator.setForceStopped(false)
      this.trigger(this.eventTypes.scrollCancel)
      return true
    }
    this.animator.setForceStopped(false)

    // reset if we are outside of the boundaries
    if (this.resetPosition(this.options.bounceTime, ease.bounce.fn)) {
      return true
    }

    this.translate(currentPos)

    this.endTime = getNow()

    const duration = this.endTime - this.startTime
    // const deltaX = Math.abs(currentPos.x - this.scrollBehaviorX.startPos)
    // const deltaY = Math.abs(currentPos.y - this.scrollBehaviorY.startPos)

    // if (this.checkFlick(duration, deltaX, deltaY)) {
    //   this.trigger(this.eventTypes.flick)
    //   return
    // }
    
    if (this.momentum(currentPos, duration)) {
      return
    }

    this.trigger(this.eventTypes.scrollEnd, currentPos)
  }

  handleTransitionEnd() {
    const endPoint = this.getCurrentPos() 
    this.translate(endPoint, {
      time: 0,
      easingFn: ease.bounce.style
    })
    if (!this.resetPosition(this.options.bounceTime, ease.bounce.fn)) {
      this.trigger(this.eventTypes.scrollEnd, endPoint)
    }
  }

  handleClick(e: TouchEvent) {
    if (
      !preventDefaultExceptionFn(e.target, this.options.preventDefaultException)
    ) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  scrollBy(deltaX: number, deltaY: number, time = 0, easingFn?: Function) {
    const { x, y } = this.getCurrentPos()

    deltaX += x
    deltaY += y

    this.scrollTo(deltaX, deltaY, time, easingFn)
  }

  scrollTo(
    x: number,
    y: number,
    time = 0,
    easingFn?: Function
  ) {
    // easing = !easing ? ease.bounce : easing
    // const easingFn = this.options.useTransition ? easing.style : easing.fn
    const scrollable = this.scrollable
    const currentPos = this.getCurrentPos()
    const startPoint: TranslaterPoint = {
      x: currentPos.x,
      y: currentPos.y,
    }
    const endPoint: TranslaterPoint = {
      x: scrollable.x ? x : startPoint.x,
      y: scrollable.y ? y : startPoint.y,
    }

    this.trigger(this.eventTypes.scrollTo, endPoint)
    if (!this.trigger(this.eventTypes.ignoreDisMoveForSamePos)) {
      // it is an useless move
      if (startPoint.x === endPoint.x && startPoint.y === endPoint.y) {
        return
      }
    }
    
    if (!time) {
      this.translate(endPoint)
      this.trigger(this.eventTypes.scroll, endPoint)
      return
    }

    easingFn = easingFn || ease.bounce.fn

    this.animatorId = this.animator.start(
      // animation step
      (percent: number) => {
        const newPoint = {} as { [key: string]: any }
        Object.keys(endPoint).forEach(key => {
          const startValue = startPoint[key]
          const endValue = endPoint[key]
          newPoint[key] = (endValue - startValue) * percent + startValue
        })

        this.translate(<TranslaterPoint>newPoint)

        if (this.options.probeType === Probe.Realtime) {
          this.trigger(this.eventTypes.scroll, newPoint)
        }
      },
      // animation end verification
      null,
      // animation end
      (percent: number, id: number, isComplete: boolean) => {
        if (!isComplete) {
          return
        }

        this.translate(endPoint)

        if (!this.pending && !this.resetPosition(this.options.bounceTime, ease.bounce.fn)) {
          this.trigger(this.eventTypes.scrollEnd, endPoint)
        }
      },
      time,
      easingFn
    )
  }

  getCurrentPos(): TranslaterPoint {
    return {
      x: this.scrollBehaviorX.getCurrentPos(),
      y: this.scrollBehaviorY.getCurrentPos()
    }
  }

  resetPosition(time = 0, easingFn?: Function) {
    const {
      position: x,
      inBoundary: xInBoundary
    } = this.scrollBehaviorX.checkInBoundary()
    const {
      position: y,
      inBoundary: yInBoundary
    } = this.scrollBehaviorY.checkInBoundary()

    if (xInBoundary && yInBoundary) {
      return false
    }

    // out of boundary
    this.scrollTo(x, y, time, easingFn)

    return true
  }

  setDimensions(wrapperRect: DOMRect, contentRect: DOMRect) {
    this.wrapperRect = wrapperRect
    this.contentRect = contentRect
    this.scrollBehaviorX.setDimensions(wrapperRect, contentRect)
    this.scrollBehaviorY.setDimensions(wrapperRect, contentRect)
  }

  getOffsets() {
    return {
      left: this.scrollBehaviorX.currentPos,
      top: this.scrollBehaviorY.currentPos,
    }
  }

  refresh() {
    this.scrollBehaviorX.refresh()
    this.scrollBehaviorY.refresh()

    this.endTime = 0
    // this.wrapperOffset = offset(this.wrapper)

    // this.resetPosition()
    this.trigger(this.eventTypes.refresh)
  }

  enable() {
    this.enabled = true
  }

  disable() {
    this.stopAnimation()
    this.enabled = false
  }

  destroy() {
    this.trigger(this.eventTypes.destroy)
    this.scrollBehaviorX.destroy()
    this.scrollBehaviorY.destroy()
  }

  stopAnimation() {
    this.animator.stop(this.animatorId)
  }

  get pending () {
    return this.animator.isRunning(this.animatorId)
  }

  get scrollable () {
    return {
      x: this.scrollBehaviorX.hasScroll,
      y: this.scrollBehaviorY.hasScroll,
    }
  }
}