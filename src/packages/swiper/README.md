---
component: swiper
title: Swiper 轮播
preview: https://didi.github.io/mand-mobile/examples/#/swiper
---

# Swiper 轮播

走马灯，用于一组图片或卡片轮播

## 引入

```javascript
import { Swiper } from 'mand-mobile-next'

Vue.createApp().component(Swiper.name, Swiper)
```

## 代码演示

<demo-wrapper
  src="src/packages/swiper/demo"
/>

## API

### Swiper Props

|属性|说明|类型|默认值|可选值/备注|
|---|---|---|---|---|
|autoplay|自动切换间隔时长(毫秒), 禁用可设置为`0`|Number|`3000`|`0`, `[500, +Int.Max)`|
|transition|面板切换动画效果|String|`slide`|`slide`, `slideY`, `fade`|
|default-index|第一屏面板索引值|Number|`0`|`[0, length - 1]`|
|has-dots|控制面板指示点|Boolean|`true`|-|
|is-prevent| 阻止滚动区域点击事件 | Boolean |`true`| - |
|dragable|触摸滑动|Boolean|`true`|-|
|is-loop |循环播放|Boolean|`true`|-|

### Swiper Events

#### @beforeChange(from, to)

轮播器将要切换前的事件

|参数 | 说明 | 类型 |
|----|-----|------|
| from     | 轮播器当前展示的索引值 | Number          |
| to     | 轮播器下一屏展示的索引值 | Number          |

#### @afterChange(from, to)

轮播器切换完成时的事件

|参数 | 说明 | 类型 |
|----|-----|------|
| from     | 轮播器当前展示的索引值 | Number          |
| to     | 轮播器下一屏展示的索引值 | Number          |

### Swiper Methods

#### getSwiperInstance

获取 `Bscroll` 实例

### resetSwiper

重置 `swiper`，用于异步渲染
