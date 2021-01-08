<template>
  <div class="md-steps-item md-steps-item--vertical"
    :class="{
      'md-reached': isReached,
      'md-current': isCurrent,
      'md-last': isLast,
      'md-adaptive': adaptive,
    }"
    :style="[
      step.alignItems ? {alignItems: step.alignItems} : ''
    ]"
  >
    <div class="md-steps-item_container">
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
        <div class="md-steps_bar" :style="[
          step.barSize ? {width: `${step.barSize}px`} : '',
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
      <div class="md-steps_text">
        <slot v-if="slots.content" name="content"/>
        <template v-else>
          <div class="md-name">{{step.name}}</div>
          <div class="md-desc" v-if="step.text">{{step.text}}</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {flatStyleObject} from '@mand-mobile/shared/lib/util'

export default {
  name: 'md-steps-vertical',

  props: ['step', 'index', 'progress', 'isReached', 'isCurrent', 'isLast', 'adaptive', 'slots'],
  computed: {
    barInnerTransformStyle() {
      const {progress} = this
      if (!progress) {
        return ''
      }
      const step = (progress && progress.len) || 0
      return flatStyleObject({
        transform: `translate3d(0, ${(step - 1) * 100}%, 0)`,
        transition: `all ${progress.time}s linear`,
      })
    },
  },
}

</script>

<style lang="stylus">
.md-steps-item--vertical
  position relative
  display flex
  width 100%
  min-height 110px
  align-items stretch
  // margin-bottom 10px
  &.md-last .md-steps_bar
    display none
  &.md-reached, &.md-current
    .md-steps_icon
      color md-steps-color-active
  &.md-adaptive
    height 100% // uni
    flex 1
    &.md-last
      display contents
  
.md-steps-item_container
  display flex
  // height 100%
  align-items: stretch

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
    left md-steps-icon-size
    padding-left md-steps-text-gap-vertical
    .md-name, .md-desc
      line-height 1
      white-space normal
    .md-name
      color md-steps-text-color
    .md-desc
      margin-top 18px
      font-size md-steps-desc-font-size
      color md-steps-desc-color
  .md-steps_bar
    position relative
    flex 1
    width md-steps-border-size
    background-color md-steps-color
    overflow hidden
    .md-bar_inner
      z-index 10
      width md-steps-border-size
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