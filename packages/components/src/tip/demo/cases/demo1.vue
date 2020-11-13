<template>
  <div class="md-example-child md-example-child-tip md-example-child-tip-4">
    <md-tip
      name="md-tip-4"
      icon="security"
      content="完善信息，领取5元免息券"
      :offset="{top: -10}"
      fill
      @show="onShow"
      @hide="onHide"
    >
      <md-button size="small" type="default">点击我</md-button>
    </md-tip>
  </div>
</template>

<script>
import Tip from 'mand-mobile/lib/tip'
import Button from 'mand-mobile/lib/button'
import Toast from 'mand-mobile/lib/toast'

export default {
  name: 'tips-demo',
  /* DELETE */
  title: '其他配置',
  titleEnUS: 'Other configurations',
  /* DELETE */
  components: {
    'md-tip': Tip,
    'md-button': Button,
    'md-toast': Toast,
  },
  methods: {
    onShow(name) {
      // Toast.create.info({
      //   content: `显示了${name}`,
      // })
      Toast.succeed(`显示了${name}`)
    },
    onHide(name) {
      Toast.succeed(`隐藏了${name}`)
    },
  },
}

</script>

<style>
.md-tip-4 .md-tip-bg {
  background-color: #FFEBDF;
  box-shadow: none;
  opacity: 1;
}
.md-tip-4 .md-tip-bg:after {
  border-width: 10px 11px 0 11px;
  border-color: #FFEBDF transparent transparent transparent;
}
.md-tip-4 .md-tip-content {
  padding-left: 80px;
  color: #C37447;
}
.md-tip-4 .md-tip-content .md-icon-security {
  position: absolute;
  left: 32px;
  width: 64px !important;
  height: 64px !important;
}
</style>

