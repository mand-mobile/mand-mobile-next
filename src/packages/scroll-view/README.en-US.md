---
component: scroll-view
title: ScrollView
preview: https://didi.github.io/mand-mobile/examples/#/scroll-view
---

# ScrollView

Used to simulate native scrolling areas and support pull-down refresh and load more

### Import

```javascript
import { ScrollView, PullDown, PullUp } from 'mand-mobile-next'

Vue.createApp().component(ScrollView.name, ScrollView)
Vue.createApp().component(PullDown.name, PullDown)
Vue.createApp().component(PullUp.name, PullUp)
```

::: tip

* `PullDown` is a PullDown refresh component built into the component library. It is only used for visual display. It must be used in the slot <a href="#pulldown">pulldown</a>, pull-down refresh component is also customizable
* `PullUp` loads more components for the component library built in. It is only used as a visual display and needs to be used in the slot <a href="#pullup">pullup</a>, Loading more components can also be customized.
:::

### Code Examples

<demo-wrapper
  src="src/packages/scroll-view/demo"
/>

<!-- DEMO -->

### API

#### ScrollView Props

|Props | Description | Type | Default | Note |
|----|-----|------|------|------|
|scrolling-x | horizontal scrolling | Boolean | `true` | -|
|scrolling-y | vertical scrolling | Boolean | `true` | -|
|bouncing | - | Boolean | `true` | -|
| pull-down | can be pulled down to refresh | Boolean | `false` | - |
| pull-up | can be pulled up to load | Boolean | `false` | - |
| bounceTime | springback of time | Number | 800 | 单位 `ms` |
|is-prevent | prevent browser default scrolling | Boolean | `true` | if set to `false`, the browser defaults to scroll when scrolling is triggered over a non-scrollable angle range |
| pullDownOptions | the options of pulled down  | Object | `{ threshold: number, stop: number}` | - |
| pullUpOptions | the options of pull up | Object | `{ threshold: number }` | - |
| isFinished | is finished pull up| Boolean | `false` | - |


### PullDown Props

|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
| percent | percentage of Progress bar | Number | | - |
|is-pulling-down | status in refresh | Boolean | `false` | - |
|pull-down-text | show pull-down text | String | | - |
|roller-color| progress color | String | `#2F86F6` | - |

### PullUp Props

|Props | Description | Type | Default | Note|
|----|-----|------|------|------|
| pull-up-text | show pull-up text | String | | - |

### ScrollView Slots

#### default

scroll the area content slot

#### pulldown

 refresh component slots

#### pullup

load more component slots

#### header

suction top area slot

#### footer

suction bottom area slot

### ScrollView Events

#### pullingDown

the drop-down refresh event is triggered

#### pullingUp

the pull-up event is triggered

#### scroll

trigger scroll event

> other references [BetterScroll](https://better-scroll.github.io/docs/zh-CN/)

