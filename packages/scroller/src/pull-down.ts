/*
 * Based on the work of: BetterScroll
 * https://github.com/ustbhuangyi/better-scroll
 *
 * Copyright (c) 2015 HuangYi
 * Licensed under the MIT License.
 * https://github.com/ustbhuangyi/better-scroll/blob/dev/LICENSE
 *
 */
import Scroller from './index'
import {ease} from './animator'
import {Probe, Direction} from './utils'
const {isPlainObject} = require('@mand-mobile/shared/lib/util')

export interface PullDownRefreshConfig {
  threshold: number
  stop: number
}

export default class PullDown {
  pullActive: boolean = false
  pulling: boolean = false
  originalMinScrollY: number

  constructor(public scroller: Scroller, public options: Partial<PullDownRefreshConfig> = {}) {
    this.watch()
    this.scroller.registerType(['pullingDown', 'pullingDownReady'])
    // this.scroller.proxy(propertiesProxyConfig)
  }

  private watch() {
    // must watch scroll in real time
    this.scroller.options.probeType = Probe.Realtime
    this.scroller.on('touchMove', this.checkActive.bind(this))
    this.scroller.on('touchEnd', this.checkPullDown.bind(this))
  }

  private checkActive() {
    const { threshold = 90 } = this.options
    const { y } = this.scroller.getCurrentPos()

    const pullActive =  !!(y >= threshold)

    if (pullActive !== this.pullActive) {
      this.scroller.trigger('pullingDownReady', pullActive)
      this.pullActive = pullActive
    }
  }

  private checkPullDown() {
    const { threshold = 90, stop = 40 } = this.options
    const scrollBehaviorY = this.scroller.scrollBehaviorY
    const {x, y} = this.scroller.getCurrentPos()

    // check if a real pull down action
    if (scrollBehaviorY.direction !== Direction.Negative || y < threshold) {
      return false
    }

    if (!this.pulling) {
      this.pulling = true
      this.scroller.trigger('pullingDown')

      this.originalMinScrollY = scrollBehaviorY.minScrollPos
      scrollBehaviorY.minScrollPos = stop
    }

    this.scroller.scrollTo(
      x,
      stop,
      this.scroller.options.bounceTime,
      ease.bounce.fn
    )

    return this.pulling
  }

  finish() {
    this.pulling = false
    this.scroller.scrollBehaviorY.minScrollPos = this.originalMinScrollY
    this.scroller.resetPosition(this.scroller.options.bounceTime, ease.bounce.fn)
  }

  triggerPullToRefresh() {
    const { threshold = 90, stop = 40 } = this.options

    if (this.pulling) {
      return
    }
    this.pulling = true

    this.originalMinScrollY = this.scroller.scrollBehaviorY.minScrollPos
    this.scroller.scrollBehaviorY.minScrollPos = threshold

    this.scroller.scrollTo(this.scroller.getCurrentPos().x, threshold)
    this.scroller.trigger('pullingDown')
    this.scroller.scrollTo(
      this.scroller.getCurrentPos().x,
      stop,
      this.scroller.options.bounceTime,
      ease.bounce.fn
    )
  }
}