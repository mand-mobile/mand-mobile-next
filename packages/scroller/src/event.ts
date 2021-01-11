/*
 * Based on the work of: BetterScroll
 * https://github.com/ustbhuangyi/better-scroll
 *
 * Copyright (c) 2015 HuangYi
 * Licensed under the MIT License.
 * https://github.com/ustbhuangyi/better-scroll/blob/dev/LICENSE
 *
 */
const { warn } = require('@mand-mobile/shared/lib/util/index')

export interface Events {
  [name: string]: [Function][]
}

export interface EventTypes {
  [type: string]: string
}

export default class EventEmitter {
  events: Events
  eventTypes: EventTypes
  constructor(names: string[]) {
    this.events = {}
    this.eventTypes = {}
    this.registerType(names)
  }

  on(type: string, fn: Function, context: any = this) {
    this.hasType(type)
    if (!this.events[type]) {
      this.events[type] = []
    }

    this.events[type].push([fn])
    return this
  }

  once(type: string, fn: Function, context: any = this) {
    this.hasType(type)
    const magic = ((...args: any[]) => {
      this.off(type, magic)

      fn.apply(context, args)
    }) as any
    magic.fn = fn

    this.on(type, magic)
    return this
  }

  off(type?: string, fn?: Function) {
    if (!type && !fn) {
      this.events = {}
      return this
    }

    if (type) {
      this.hasType(type)
      if (!fn) {
        this.events[type] = []
        return this
      }

      let events = this.events[type]
      if (!events) {
        return this
      }

      let count = events.length
      while (count--) {
        if (
          events[count][0] === fn ||
          (events[count][0] && (events[count][0] as any).fn === fn)
        ) {
          events.splice(count, 1)
        }
      }

      return this
    }
  }

  trigger(type: string, ...args: any[]) {
    this.hasType(type)
    let events = this.events[type]
    if (!events) {
      return
    }

    let len = events.length
    let eventsCopy = [...events]
    let ret
    for (let i = 0; i < len; i++) {
      let event = eventsCopy[i]
      let [fn] = event
      if (fn) {
        ret = fn.apply(this, args)
        if (ret === true) {
          return ret
        }
      }
    }
  }
  registerType(names: string[]) {
    names.forEach((type: string) => {
      this.eventTypes[type] = type
    })
  }

  destroy() {
    this.events = {}
    this.eventTypes = {}
  }

  private hasType(type: string) {
    const types = this.eventTypes
    const isType = types[type] === type
    if (!isType) {
      warn(
        `EventEmitter has used unknown event type: "${type}", should be oneof [` +
          `${Object.keys(types).map(_ => JSON.stringify(_))}` +
          `]`
      )
    }
  }
}