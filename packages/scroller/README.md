---
title: Scroller
name: scroller
permalink: /packages/modules/scroller
---

Platform-independent virtual scrolling computing engine

- [Scroller](#scroller)
- [WheelScroller](#wheelscroller)
- [PullDown](#pulldown)
- [Animator](#animator)

## Scroller

```typescript
class Scroller {
  constructor(
    wrapper: HTMLElement | string,
    content:HTMLElement | string,
    options: ScrollerOptions
  ) { }
}
```

### Usage

```js
import Scroller '@mand-mobile/scroller'

const scroller = new Scroller(wrapper, content)

scroller.setDimensions(
  wrapper.getBoundingClientRect(),
  content.getBoundingClientRect()
)

scroller.on('translate', (point, styles) => { })
```

### Options

Refer to [BetterScroll - options](https://better-scroll.github.io/docs/en-US/guide/base-scroll-options.html#options)

### API

#### pending

`pending: boolean`

Determine whether the current scroller is in the process of scrolling animation

#### scrollable

`scrollable: {x: boolean, y: boolean}`

Determine whether the current scroller can scroll horizontally and vertically


#### handleStart

`handleStart: (e: TouchEvent) => void`

#### handleMove

`handleMove: (e: TouchEvent) => void`

#### handleEnd

`handleEnd: (e: TouchEvent) => void`

#### scrollTo

`scrollTo: (
  x: number,
  y: number,
  time = 0,
  easingFn?: (t: number) => number
) => void`

#### scrollBy

`scrollBy: (
  deltaX: number,
  deltaY: number,
  time = 0,
  easingFn?: (t: number) => number
) => void`

Scroll the distance x, y in the horizontal and vertical directions relative to the current position.

#### getCurrentPos

`getCurrentPos: () => {x: number, y: number}`

#### setDimensions

`setDimensions: (
  wrapperRect: DOMRect,
  contentRect: DOMRect
) => void`

Set the scroller wrapper and content rect size.

#### refresh

`refresh: () => void`

Recalculate the scroller, it must be called to ensure that the scrolling effect is normal when the scrolling area changes.

#### stopAnimation

`stopAnimation: () => void`

stop the currently running scroll animation immediately.

#### enable

`enable: () => void`

#### disable

`disable: () => void`

#### destroy

`destroy: () => void`

Destroy scroller and unbind events.


### Events

#### beforeScrollStart

Before scrolling begins (touchstart triggered)

`scroller.on('beforeScrollStart', () => {})`

#### scrollStart

When scrolling starts (touchmove)

`scroller.on('scrollStart', () => {})`

#### touchEnd

When touch ends (touchend triggered)

`scroller.on('touchEnd', () => {})`

#### scrollEnd

When scrolling ends (touchend triggered and momentum finished)

`scroller.on('scrollEnd', (point: {x: number, y: number}) => {})`

#### scroll

during scrolling

`scroller.on('scroll', (point: {x: number, y: number}) => {})`

#### scrollCancel

Scrolling is cancelled. For example, if you force a scrolling to stop.

`scroller.on('scrollCancel', () => {})`

#### translate

Internal translate triggered during scrolling, generally used to receive transform style information.

`scroller.on('translate', (point: {x: number, y: number}, styles: {}) => {})`

#### refresh

`scroller.on('refresh', () => {})`

#### destroy

`scroller.on('destroy', () => {})`

## WheelScroller

```typescript
class WheelScroller {
  constructor(scroller: Scroller, options: Options) { }
}
```

### Usage

```js
import Scroller '@mand-mobile/scroller'
import WheelScroller '@mand-mobile/scroller/wheel'

const scroller = new Scroller(wrapper, content)

scroller.setDimensions(
  wrapper.getBoundingClientRect(),
  content.getBoundingClientRect()
)

const wheel = new WheelScroller(scroller)
```

### Options

* items: any[]
* itemHeight: number
* selectedIndex: number
* invalidIndex: number[]

### API

#### wheelTo

`wheelTo: (index = 0, time = 0) => void`

#### getSelectedIndex

`getSelectedIndex: () => number`

## PullDown

```js
class PullDown {
  constructor(scroller: Scroller, options: Options) { }
}
```

### Usage

```js
import PullDown '@mand-mobile/scroller/pull-down'

const scroller = new Scroller(wrapper, content)

scroller.setDimensions(
  wrapper.getBoundingClientRect(),
  content.getBoundingClientRect()
)

const refresher = new PullDown(scroller)
```

### Options

* threshold: number
* stop: number

### API

#### finish

`finish: () => void`

#### triggerPullToRefresh

`triggerPullToRefresh: () => void`

### Events

#### pullingDownReady

`scroller.on('pullingDownReady', () => {})`

#### pullingDown

`scroller.on('pullingDown', () => {})`

## Animator

```js
class Animator {
  constructor() { }
}
```

### Usage

```js
import Animator '@mand-mobile/scroller/animator'

const animatior = new Animator()
const id = animatior.start(
  percent => {
    console.log(percent)
  }
)
animatior.stop(id)
```

### API

#### start

```typescript
start: (
  stepCallback: (percent: number) => void,
  verifyCallback: (now: number, id: number) => boolean | null, 
  completedCallback: (percent: number, id: number, isComplete: boolean) => void | null,
  duration?: number,
  easingFn?: (t: number) => number
) => number
```

#### stop

`stop: (id: number) => id`

#### isRunning

`isRunning: (id: number) => id`