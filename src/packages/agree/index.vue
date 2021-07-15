<template>
  <div
    class="md-agree"
    :class="[disabled ? 'disabled' : '']"
  >
    <div
      class="md-agree-icon"
      :class="[modelValue ? 'checked' : '']"
      @click="onChange($event)"
    >
      <md-icon :name="currentIcon" :size="size"></md-icon>
    </div>
    <div class="md-agree-content">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import MdIcon from 'mand-mobile/icon'
import {
  agreeProps as props,
  emits,
  useAgree,
} from './use-agree'

export default defineComponent({
  name: 'MdAgree',
  components: {
    MdIcon,
  },
  props,
  emits,
  setup: (props, context) => ({
    ...useAgree(props, context),
  }),
})
</script>

<style lang="stylus">
@import './index.styl'

.md-agree
  display flex
  align-items center
  &.disabled
    opacity var(--md-agree-disabled-opacity)
  .md-agree-icon
    display flex
    justify-content center
    align-items center
    align-self flex-start
    flex-shrink 0
    position relative
    margin-right var(--md-h-gap-sm)
    color agree-fill
    width 50px
    height 50px
    .md-agree-icon-container
      position relative
      .md-icon
        display flex
        width auto
        height auto
        line-height 1
        will-change auto
        &.md-icon-checked
          position absolute
          top 0
          left 0
          transform scale(0.6)
          color transparent
          transition all .3s ease-in-out-quint
        &.md-icon-check
          color var(--md-agree-fill)
    &.checked .md-agree-icon-container
      .md-icon-checked
        transform scale(1)
        color var(--md-agree-fill)
      .md-icon-check
        opacity 0.8
.md-example-child-agree
  padding 20px 32px
  font-size .24rem
  background #fff
.md-agree-content
  flex 1 1 0%
  line-height 1.5
  color #858b9c
</style>
