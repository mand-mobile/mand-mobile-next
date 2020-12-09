---
title: ActionBar 操作栏
preview: https://didi.github.io/mand-mobile/examples/#/action-bar
---

汇集若干文案或操作按钮的吸底边栏，可用于展示表单信息与提交按钮

## 引入

```javascript
import { ActionBar } from 'mand-mobile'

Vue.component(ActionBar.name, ActionBar)
```

## 使用指南

::: tip
默认使用`position: fixed`固定在页面底部，为避免遮挡内容区底部预留不小于`100px`的空白（iPhone还需额外增加`constant(safe-area-inset-bottom)/env(safe-area-inset-bottom)`）
:::

## 代码演示
<!-- DEMO -->
<MDDemoWrapper>
<!-- left wrapper -->
{{{ @/packages/components/src/action-bar/demo/cases/demo0.vue
{{{ @/packages/components/src/action-bar/demo/cases/demo2.vue
<!-- right wrapper -->
}}} @/packages/components/src/action-bar/demo/cases/demo1.vue
}}} @/packages/components/src/action-bar/demo/cases/demo3.vue
</MDDemoWrapper>

## API

### ActionBar Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|actions|按钮组|Array\<[ActionOptions](#actionoptions)\>| | |

#### ActionOptions

|属性 | 说明 | 类型 | 默认值| 备注|
|----|-----|------|------|------|
|text|文案|String| | |
|disabled|禁用|Boolean|`false`| |
|onClick|点击回调|Function(action: [ActionOptions](#actionoptions))| | |
|type|类型|String|`disabled`/`primary`|`disabled`为`true`时为`disabled`，否则为`primary`|
|plain|朴素|Boolean| |最后一个按钮为`false`，其它为`true`|
|round|圆角|Boolean|`false`| |
|icon|按钮图标|String| | |
|icon-svg <MDPlatformTag web/>|按钮svg图标|Boolean|`false`| |
|inactive|未激活|Boolean|`false`| |
|loading|加载中状态|Boolean|`false`| |

### ActionBar Slots

#### default
左侧文案内容

### ActionBar Events

#### @click(event, action, index)
按钮点击事件

|属性 | 说明 | 类型 |
|----|-----|------|
|action|actions列表中被点击按钮对应的对象|Object: [ActionOptions](#actionoptions)|
|index|actions列表中被点击按钮对应的对象的数组下标|Number|
