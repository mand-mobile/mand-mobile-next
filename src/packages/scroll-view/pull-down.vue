<template>
  <div class="md-scroll-pulldown">
    <md-roller
      :process="isPullingDown ? undefined : percent"
      :width="10"
      :color="rollerColor"
    ></md-roller>
    <p class="pulldown-tip">{{ pullDownText }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ActivityIndicatorRolling } from 'mand-mobile-next/activity-indicator'

export default defineComponent({
  name: 'MdScrollViewPulldown',
  components: {
    MdRoller: ActivityIndicatorRolling,
  },
  props: {
    rollerColor: {
      type: String,
      default: '#2F86F6',
    },
    percent: {
      type: Number,
      default: undefined,
    },
    pullDownText: {
      type: String,
      default: '',
    },
    isPullingDown: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="stylus">
.md-scroll-pulldown
  display flex
  justify-content center
  align-items center
  padding 20px
  overflow hidden
  .md-activity-indicator-rolling
    .md-activity-indicator-svg
      width 32px !important
      height 32px !important
      transform rotateZ(-45deg)
  .pulldown-tip
    margin-left 15px
    font-size 24px
    color #999
</style>
