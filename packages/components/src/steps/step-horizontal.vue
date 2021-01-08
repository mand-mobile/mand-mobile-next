<template>
  <div class="md-steps-item md-steps-item--horizontal"
    :class="[
      isReached ? 'md-reached': '',
      isCurrent ? 'md-current': '',
      isLast ? 'md-last': '',
      !step.textPosition && dislocation ? 'md-dislocation': '',
      step.textPosition ? `md-position-${step.textPosition}` : '',
      step.textAlign ? `md-textalign-${step.textAlign}` : ''
    ]"
    :style="{
      alignItems: step.alignItems || 'center'
    }"
  >
    <div class="md-steps_wrapper">
      <div
        class="md-steps_icon"
        :style="[step.iconSize ? {
          minWidth: `${step.iconSize}px`,
          minHeight: `${step.iconSize}px`
        } : '']"
      >
        <template v-if="slots.icon">
          <slot name="icon"/>
        </template>
        <template v-else-if="isReached">
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
    <div class="md-steps_bar" :style="[
      step.barSize ? {height: `${step.barSize}px`} : '',
      step.barColor ? {backgroundColor: step.barColor} : ''
    ]">
      <i
        v-if="progress"
        class="md-bar_inner"
        :style="barInnerTransformStyle"
      ></i>
      <p v-if="step.barText" class="md-bar_text">{{step.barText}}</p>
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

  &.md-dislocation, &.md-position-top
    .md-steps_text
      top auto
      bottom 100%
      padding-top 0
      padding-bottom md-steps-text-gap-horizontal
  &.md-textalign-left
    .md-steps_text
      left 50%
      text-align left
  &.md-textalign-right
    .md-steps_text
      right 50%
      text-align right
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
      font-size md-steps-desc-font-size
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
      height 100%
      background-color md-steps-color-active
      position absolute
      top 0
      left 0
      display block
      content ''
      transition all linear 1s
    .md-bar_text
      position absolute
      absolute-pos()
      z-index 11
      display flex
      align-items center
      justify-content center
      font-size 20px
      color #FFF
</style>