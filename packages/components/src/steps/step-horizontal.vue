<template>
  <div class="md-steps-item md-steps-item--horizontal"
    :class="{
      'md-reached': isReached,
      'md-current': isCurrent,
      'md-last': isLast,
      'md-dislocation': dislocation
    }"
  >
    <div class="md-steps_wrapper">
      <div v-if="slots.icon" class="md-steps_icon">
        <slot name="icon"/>
      </div>
      <div v-else class="md-steps_icon">
        <template v-if="isReached">
          <slot name="reached"/>
        </template>
        <template v-else-if="isCurrent">
          <slot name="current"/>
        </template>
        <template v-else>
          <slot name="unreached"/>
        </template>
      </div>
      <div class="md-steps_text">
        <slot v-if="slots.content" name="content"/>
        <template v-else>
          <div class="md-name">{{step.name}}</div>
          <div class="md-desc" v-if="step.text">{{step.text}}</div>
        </template>
      </div>
    </div>
    <div class="md-steps_bar">
      <i
        v-if="progress"
        class="md-bar_inner"
        :style="barInnerTransformStyle"
      ></i>
    </div>
  </div>
</template>

<script>
import {flatStyleObject} from '@mand-mobile/shared/lib/util'

export default {
  name: 'md-steps-horizontal',

  props: ['step', 'index', 'progress', 'dislocation', 'isReached', 'isCurrent', 'isLast', 'slots'],
  computed: {
    barInnerTransformStyle() {
      const {progress} = this
      if (!progress) {
        return ''
      }
      const step = (progress && progress.len) || 0
      return flatStyleObject({
        transform: `translate3d(${(step - 1) * 100}%, 0, 0)`,
        transition: `all ${progress.time}s linear`,
      })
    },
  },
}

</script>

<style lang="stylus">
.md-steps-item--horizontal
  position relative
  display flex
  align-items center
  flex 1

  &.md-dislocation
    .md-steps_text
      top auto
      bottom 100%
      padding-top 0
      padding-bottom md-steps-text-gap-horizontal
  &.md-last
    display contents
    .md-steps_bar
      display none
  &.md-reached, &.md-current
    .md-steps_icon, .md-steps_text .md-name
      color md-steps-color-active

  .md-steps_wrapper
    position relative
    display flex
    flex-direction column
    align-items center
  .md-steps_icon
    display flex
    justify-content center
    align-items center
    position relative
    min-width md-steps-icon-size
    min-height md-steps-icon-size
    color md-steps-color
  .md-steps_text
    position absolute
    top 100%
    padding-top md-steps-text-gap-horizontal
    text-align center
    .md-name, .md-desc
      line-height 1
      white-space nowrap
    .md-name
      color md-steps-text-color
    .md-desc
      margin-top 18px
      color md-steps-desc-color

  .md-steps_bar
    position relative
    flex 1
    height md-steps-border-size
    background-color md-steps-color
    overflow hidden
    .md-bar_inner
      z-index 10
      width 100%
      height md-steps-border-size
      background-color md-steps-color-active
      position absolute
      top 0
      left 0
      display block
      content ''
      transition all linear 1s
</style>