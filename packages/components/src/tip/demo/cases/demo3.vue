<template>
  <div class="md-example-child md-example-child-tip md-example-child-tip-3">
    <md-tip content="点击拼车更有优惠，拼成还可能获得随机礼包" placement="right">
      <md-button type="default" size="small" inline>点击我</md-button>
    </md-tip>
  </div>
</template>

<script>
import Tip from '../../index.js'
import Button from '../../../button/index'

export default {
  name: 'tips-demo',
  /* DELETE */
  title: '右侧',
  titleEnUS: 'Right',
  /* DELETE */
  components: {
    'md-tip': Tip,
    'md-button': Button,
  },
}

</script>
