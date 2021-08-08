---
component: scroll-view
title: ScrollView 滚动区域/下拉刷新
preview: https://didi.github.io/mand-mobile/examples/#/scroll-view
---

# ScrollView 滚动区域

用于模拟原生的滚动区域，并支持下拉刷新和加载更多

## 引入

```javascript
import { ScrollView, PullDown, PullUp } from 'mand-mobile-next'

Vue.createApp().component(ScrollView.name, ScrollView)
Vue.createApp().component(PullDown.name, PullDown)
Vue.createApp().component(PullUp.name, PullUp)
```

::: tip

* `PullDown`为组件库内置的下拉刷新组件，仅用于作为视觉展示，需在插槽<a href="#pulldown">pulldown</a>中使用，下拉刷新组件也可自定义
* `PullUp`为组件库内置的加载更多组件，仅用于作为视觉展示，需在插槽<a href="#pullup">pullup</a>中使用，加载更多组件也可自定义
* **组件容器需具有高度，否则会出现无法滚动或回弹问题。** 更多使用的常见问题请查看<a href="#附录">附录</a>
:::

## 代码演示

<demo-wrapper
  src="src/packages/scroll-view/demo"
/>

## API

### ScrollView Props

|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|scrolling-x | 水平滚动 | Boolean | `true` | - |
|scrolling-y | 垂直滚动 | Boolean | `true` | - |
|bouncing | 可回弹 | Boolean | `true` | - |
| pull-down | 可下拉刷新 | Boolean | `false` | - |
| pull-up | 可上拉加载 | Boolean | `false` | - |
| bounceTime | 回弹时间 | Number | 800 | 单位 `ms` |
| isPrevent | 是否屏蔽滚动区域 `click` 事件 | Boolean | `true` | - |
| pullDownOptions | 下拉刷新配置 | Object | `{ threshold: number, stop: number}` | - |
| pullUpOptions | 上拉加载配置 | Object | `{ threshold: number }` | - |
| isFinished | 上拉加载完成 | Boolean | `false` | - |

### PullDown Props

|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
| percent | 进度条百分比 | Number | | - |
|is-pulling-down | 刷新中状态 | Boolean | `false` | - |
|pull-down-text | 显示的文案 | String | | - |
|roller-color| 进度条颜色 | String | `#2F86F6` | - |

### PullUp Props

|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
| pull-up-text | 显示的文案 | String | | - |

### ScrollView Slots

#### default

滚动区域内容插槽

#### pulldown

下拉刷新组件插槽

#### pullup

加载更多组件插槽

#### header

吸顶区域插槽

#### footer

吸底区域插槽

### ScrollView Events

#### pullingDown

触发下拉刷新事件

#### pullingUp

触发上拉加载事件

#### scroll

触发滚动事件

> 其他可参考 [BetterScroll](https://better-scroll.github.io/docs/zh-CN/)
