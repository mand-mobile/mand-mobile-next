---
component: button
category: basic
title: Button 按钮
preview: https://didi.github.io/mand-mobile/examples/#/button
---

按钮组件，可配置多种不同的按钮样式

## 引入

```javascript
import { Button } from 'mand-mobile'

Vue.component(Button.name, Button)
```

## 代码演示

<MDDemoWrapper>
<!-- left wrapper -->
{{{ @/packages/components/src/button/demo/cases/demo0.vue
{{{ @/packages/components/src/button/demo/cases/demo2.vue
<!-- right wrapper -->
}}} @/packages/components/src/button/demo/cases/demo1.vue
}}} @/packages/components/src/button/demo/cases/demo3.vue
}}} @/packages/components/src/button/demo/cases/demo4.vue
</MDDemoWrapper>

## API

### Button Props
|属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------ |------|
|type|样式|String|`default`|`default`, `primary`, `warning`, `disabled`, `link`|
|native-type|类型|String|`button`|-|
|size|尺寸|String|`large`|`large/small`，小尺寸可直接用属性`small`简写|
|plain|朴素|Boolean|`false`|-|
|round|圆角|Boolean|`false`|-|
|inline|行内|Boolean|`false`|-|
|inactive|未激活|Boolean|`false`|`inactive`设为`true`和`disabled`类型的按钮都无法点击，前者一般用于表单校验无效等主观因素，后者用于无权限或无库存等客观因素|
|icon|图标|String|-|可选值请参考组件`Icon`|
|icon-svg <MDPlatformTag web/>|使用svg图标|Boolean|`false`|-|
|loading|加载中状态|Boolean\/String|`false`|`roller`（等同于true），`spinner`，`ring`，`carousel`|
|loading-color <MDPlatformTag web/>|加载中图标颜色|String|`false`|参考`ActivityIndicator`|

### Button Slots

#### default
按钮内容

### Button Events

#### @click(event)
按钮点击事件
