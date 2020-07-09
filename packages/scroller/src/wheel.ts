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
const {isPlainObject} = require('@mand-mobile/shared/lib/util')

export type wheelOptions = Partial<WheelConfig>
export interface WheelConfig {
  items: any[]
  itemHeight: number
  selectedIndex: number
  invalidIndex: number[]
  rotate: number
  adjustTime: number
}

export default class WheelScroller {
  options: wheelOptions
  wheelItemsAllDisabled: boolean
  items: any[]
  itemHeight: number
  selectedIndex: number
  target: EventTarget | null

  constructor(public scroller: Scroller, options: wheelOptions) {
    this.options = options
    this.items = this.options.items || []
    this.itemHeight = this.options.itemHeight || this.itemHeight || 0
    this.init()
  }

  init() {
    if (this.options) {
      this.normalizeOptions()
      this.refresh()
      this.tapIntoHooks()
      this.wheelTo(this.selectedIndex)
    }
  }

  refresh() {
    const scroller = this.scroller
    const scrollBehaviorX = scroller.scrollBehaviorX
    const scrollBehaviorY = scroller.scrollBehaviorY
    const itemLength = this.options.items ? this.options.items.length : 0
    
    this.checkWheelAllDisabled()

    if (!itemLength) {
      return
    }

    if (this.selectedIndex === undefined) {
      this.selectedIndex = this.options.selectedIndex || 0
    }

    this.itemHeight = scrollBehaviorY.originContentSize / itemLength

    scrollBehaviorX.maxScrollPos = 0
    scrollBehaviorY.maxScrollPos = -this.itemHeight * (itemLength - 1)
    scrollBehaviorX.minScrollPos = 0
    scrollBehaviorY.minScrollPos = 0
    scrollBehaviorY.hasScroll =
      scrollBehaviorY.options && scrollBehaviorY.maxScrollPos <= scrollBehaviorY.minScrollPos
  }

  getSelectedIndex() {
    return this.selectedIndex
  }

  wheelTo(index = 0, time = 0) {
    const y = -index * this.itemHeight
    this.scroller.scrollTo(0, y, time, ease.bounce.fn)
  }

  private normalizeOptions() {
    const options = (this.options = isPlainObject(this.options)
      ? this.options
      : {})
    if (!options.rotate) {
      options.rotate = 25
    }
    if (!options.adjustTime) {
      options.adjustTime = 400
    }
    if (!options.invalidIndex) {
      options.invalidIndex = []
    }
  }

  private checkWheelAllDisabled() {
    const items = this.items
    this.wheelItemsAllDisabled = true
    for (let i = 0; i < items.length; i++) {
      if (!items[i].disabled) {
        this.wheelItemsAllDisabled = false
        break
      }
    }
  }

  findNearestValidWheel(y: number) {
    y = y > 0 ? 0 : y < this.scroller.maxScrollY ? this.scroller.maxScrollY : y
    let currentIndex = this.itemHeight ? Math.abs(Math.round(-y / this.itemHeight)) : 0
    const cacheIndex = currentIndex
    const invalidIndex = this.options.invalidIndex
    const items = this.items

    // Impersonation web native select
    // first, check whether there is a enable item whose index is smaller than currentIndex
    // then, check whether there is a enable item whose index is bigger than currentIndex
    // otherwise, there are all disabled items, just keep currentIndex unchange

    while (currentIndex >= 0) {
      if (items[currentIndex] && !items[currentIndex].disabled && !~invalidIndex!.indexOf(currentIndex)) {
        break
      }
      currentIndex--
    }

    if (currentIndex < 0) {
      currentIndex = cacheIndex
      while (currentIndex <= items.length - 1) {
        if (items[currentIndex] && !items[currentIndex].disabled && !~invalidIndex!.indexOf(currentIndex)) {
          break
        }
        currentIndex++
      }
    }

    // keep it unchange when all the items are disabled
    if (currentIndex === items.length) {
      currentIndex = cacheIndex
    }
    
    // when all the items are disabled, this.selectedIndex should always be -1
    return {
      index: this.wheelItemsAllDisabled ? -1 : currentIndex,
      y: -currentIndex * this.itemHeight
    }
  }

  // private rotateX(y: number) {
  //   const { rotate = 25 } = this.options
  //   for (let i = 0; i < this.items.length; i++) {
  //     let deg = rotate * (y / this.itemHeight + i)
  //     ;(this.items[i] as HTMLElement).style[
  //       style.transform as anygetSelectedIndex
  //     ] = `rotateX(${deg}deg)`
  //   }
  // }

  private tapIntoHooks() {
    const scroller = this.scroller
    const scrollBehaviorY = scroller.scrollBehaviorY

    scroller.on(scroller.eventTypes.refresh, () => {
      this.refresh()
    })
    // scroller.hooks.on(scroller.hooks.eventTypes.checkClick, () => {
    //   const index = Array.from(this.items).indexOf(this.target as Element)
    //   if (index === -1) return true
    //   this.wheelTo(index, this.options.adjustTime)
    //   return true
    // })
    scroller.on(scroller.eventTypes.scrollTo, (endPoint: { x: number; y: number }) => {
      const item = this.findNearestValidWheel(endPoint.y)
      endPoint.y = item.y
    })
    scroller.on(scroller.eventTypes.ignoreDisMoveForSamePos, () => {
      return true
    })
    // scroller.on(scroller.eventTypes.beforeStart, (e: TouchEvent) => {
    //   this.target = e.target
    // })
    scroller.on(
      scroller.eventTypes.translate,
      (endPoint: { x: number; y: number }) => {
        // this.rotateX(endPoint.y)
        const item = this.findNearestValidWheel(endPoint.y)
        this.selectedIndex = item.index
      }
    )

    scrollBehaviorY.hooks.on(
      scrollBehaviorY.hooks.eventTypes.momentum,
      (
        momentumInfo: {
          destination: number
          duration: number
          rate: number
        },
        distance: number
      ) => {
        momentumInfo.rate = 4
        momentumInfo.destination = this.findNearestValidWheel(
          momentumInfo.destination
        ).y
        const maxDistance = 1000
        const minDuration = 800
        if (distance < maxDistance) {
          momentumInfo.duration = Math.max(
            minDuration,
            (distance / maxDistance) * scroller.options.swipeTime
          )
        }
      }
    )
    scrollBehaviorY.hooks.on(
      scrollBehaviorY.hooks.eventTypes.end,
      (momentumInfo: { destination: number; duration: number }) => {
        let validWheel = this.findNearestValidWheel(scrollBehaviorY.currentPos)
        momentumInfo.destination = validWheel.y
        momentumInfo.duration = this.options.adjustTime as number
        this.selectedIndex = validWheel.index
      }
    )
  }
}