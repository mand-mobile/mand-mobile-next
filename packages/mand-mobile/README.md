# `mand-mobile-next`

## Install

> yarn add mand-mobile-next

or 

> npm install mand-mobile-next


## Docs

目前API整体和[mand-mobile V2.0](https://didi.github.io/mand-mobile/#/zh-CN/home)保持一致

## 引用

### Web

以button为例
```js
<template>
  <div class="md-example-child md-example-child-button md-example-child-button-0">
    <md-button class="md-button" type="default">Default</md-button>
  </div>
</template>

<script>
import Button from 'mand-mobile/lib/web/button'

export default {
  name: 'button-demo',
  components: {
    'md-button': Button,
  },
}

</script>

<style lang="stylus" scoped>
.md-button
  display block
  margin-bottom 16px
</style>
```

### Uni

以button为例
```js
<template>
  <div class="md-example-child md-example-child-button md-example-child-button-0">
    <md-button class="md-button" type="default">Default</md-button>
  </div>
</template>

<script>
import Button from 'mand-mobile/lib/uni/button'

export default {
  name: 'button-demo',
  components: {
    'md-button': Button, // 不支持以 [Button.name]: Button获取组件
  },
}

</script>

<style lang="stylus" scoped>
.md-button
  display block
  margin-bottom 16px
</style>
```


