---
component: slider
title: Slider 滑块
preview: https://didi.github.io/mand-mobile/examples/#/slider
---

# Slider 滑块

## 引入

```javascript
import { Slider } from 'mand-mobile-next'

Vue.createApp().component(Slider.name, Slider)
```

## 代码演示

<demo-wrapper
  src="src/packages/slider/demo"
/>

## API

### Slider Props

|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|v-model|双向绑定的值|number/number[]|`0`|当开启 range 时, 其值为数组形式|
|disabled|是否禁用滑块|Boolean|`false`|-|
|min|可拖动的最小值|number|`0`|-|
|max|可拖动的最大值|number|`100`|-|
|step|步长|number|`1`|-|
|range|是否启动双向拖动|Boolean|`false`|-|
|format|显示文本的格式化函数|Function|`(val) => {return val}`|-|
|hasTip|是否有气泡提示|Boolean|`true`| |
|tip-Placement|气泡提示位置|String|'top'| |
