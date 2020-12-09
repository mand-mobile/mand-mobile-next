<template>
  <div class="md-example-child md-example-child-tip md-example-child-tip-0">
    <md-tip content="不错哟" placement="top">
      <md-button inline size="small" type="default">上方</md-button>
    </md-tip>
    <md-tip content="不错哟" placement="bottom">
      <md-button inline size="small" type="default">下方</md-button>
    </md-tip>
    <md-tip content="不错哟" placement="left">
      <md-button inline size="small" type="default">左侧</md-button>
    </md-tip>
    <md-tip content="不错哟" placement="right">
      <md-button inline size="small" type="default">右侧</md-button>
    </md-tip>
  </div>
</template>

<script>
import Tip from 'mand-mobile/lib/tip'
import Button from 'mand-mobile/lib/button'

export default {
  components: {
    'md-tip': Tip,
    'md-button': Button,
  },
}

</script>