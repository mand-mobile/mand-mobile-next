---
component: result-page
title: ResultPage 结果页
preview: https://didi.github.io/mand-mobile/examples/#/result-page
---

# ResultPage 结果页

用于展示流程结束页面的控件

## 引入

```javascript
import { ResultPage } from 'mand-mobile-next'

Vue.component(ResultPage.name, ResultPage)
```

## 使用指南

建议将组建的父元素设置填满视窗，以达到居中的效果。页面上的图片会根据`type`设置相应的默认值

## 代码演示

<demo-wrapper
  src="src/packages/result-page/demo"
  :demos="demos"
/>

<script setup>
const demos = import.meta.globEager('../../../src/packages/result-page/demo/demo*.vue')
</script>

## API

### ResultPage Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|type | 页面类别 | String | `empty` | type可取`lost`, `network`和`empty`三个值，分别代表页面丢失、网络出错和空信息。根据类别不同，组件会拥有不同的默认图片和文案|
|img-url | 图片链接 | String | [空信息图片](http://manhattan.didistatic.com/static/manhattan/mand-mobile/result-page/2.1/empty.png) | 根据类别不同，组件会拥有不同的默认图片 |
|text | 主文案 | String | `暂无信息` | 根据类别不同，组件会拥有不同的默认主文案 |
|subtext | 副文案 | String |  | 以更小的字体和更淡的颜色显示在主文案下方 |
|buttons | 按钮列表 | Array\<[ButtonOptions](#buttonoptions)\> |  | 按钮对象数组，按钮可参考`Button`|

#### ButtonOptions
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|text | 按钮文字 | String | - | - |
|type | 按钮样式类别 | String | `default` | 可参考`Button` |
|plain |朴素|Boolean|最后一个按钮为`false`，其它为`true`|
|round |圆角|Boolean|`false`|-|
|inactive |未激活|Boolean|`false`|-|
|icon |按钮图标|String|-|-|
|iconSvg |按钮svg图标|Boolean|`false`|-|
|loading |加载中状态|Boolean|`false`|-|
|handler | 点击操作 | Function | - | 点击按钮后调用的方法 |

### ResultPage Events

### @action(button: [ButtonOptions](#buttonoptions))
点击按钮时触发，也可以直接配置[ButtonOptions](#buttonoptions)中的handler
