---
title: Slider 滑块
preview: https://didi.github.io/mand-mobile/examples/#/slider
---

## 引入

```javascript
import { Slider } from 'mand-mobile'

Vue.component(Slider.name, Slider)
```

## 代码演示
<!-- DEMO -->
<MDDemoWrapper>
<!-- left wrapper -->
{{{ @/packages/components/src/slider/demo/cases/demo0.vue
{{{ @/packages/components/src/slider/demo/cases/demo2.vue
{{{ @/packages/components/src/slider/demo/cases/demo4.vue
<!-- right wrapper -->

}}} @/packages/components/src/slider/demo/cases/demo1.vue
}}} @/packages/components/src/slider/demo/cases/demo3.vue
}}} @/packages/components/src/slider/demo/cases/demo5.vue
</MDDemoWrapper>

## API

### Slider Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|value|双向绑定的值|number/number[]|`0`|当开启<code>range</code>时, 其值为数组形式</code>|
|disabled|是否禁用滑块|Boolean|`false`|-|
|min|可拖动的最小值|number|`0`|-|
|max|可拖动的最大值|number|`100`|-|
|step|步长|number|`1`|-|
|range|是否启动双向拖动|Boolean|`false`|-|
|format|显示文本的格式化函数|Function|`(val) => {return val}`|-|
|is-vibrate <MDPlatformTag uni/>|按下拖动按钮时震动|Boolean|`true`| |
