<template>
  <div
    ref="stepsRef"
    class="md-steps"
    :class="{
      'md-steps-vertical': direction == 'vertical',
      'md-steps-horizontal': direction == 'horizontal',
      'vertical-adaptive':
        direction == 'vertical' && verticalAdaptive,
      'no-current': currentLength % 1 !== 0,
    }"
  >
    <template
      v-for="(step, index) of steps"
      :key="`steps-${index}`"
    >
      <div
        class="step-wrapper"
        :class="[getStepStatusClass(index)]"
      >
        <!-- Customize uniformly -->
        <div v-if="$slots.icon" class="icon-wrapper">
          <slot
            name="icon"
            :index="index"
            :current-index="currentLength"
          ></slot>
        </div>
        <!-- Customize by status-->
        <div v-else class="icon-wrapper">
          <template v-if="index < currentLength">
            <slot
              v-if="$slots.reached || $slots.reached"
              name="reached"
              :index="index"
            ></slot>
            <div v-else class="step-node-default">
              <div
                class="step-node-default-icon"
                style="
                  width: 6px;
                  height: 6px;
                  border-radius: 50%;
                "
              ></div>
            </div>
          </template>
          <template v-else-if="index === currentLength">
            <slot
              v-if="$slots.current || $slots.current"
              name="current"
              :index="index"
            ></slot>
            <md-icon v-else name="success"></md-icon>
          </template>
          <template v-else>
            <slot
              v-if="$slots.unreached || $slots.unreached"
              name="unreached"
              :index="index"
            ></slot>
            <div v-else class="step-node-default">
              <div
                class="step-node-default-icon"
                style="
                  width: 6px;
                  height: 6px;
                  border-radius: 50%;
                "
              ></div>
            </div>
          </template>
        </div>
        <div class="text-wrapper">
          <slot
            v-if="$slots.content"
            name="content"
            :index="index"
            :step="step"
          ></slot>
          <template v-else>
            <div class="name">
              {{ step.name }}
            </div>
            <div v-if="step.text" class="desc">
              {{ step.text }}
            </div>
          </template>
        </div>
      </div>
      <div
        class="bar"
        :class="[
          direction === 'horizontal'
            ? 'horizontal-bar'
            : 'vertical-bar',
        ]"
        :style="getStepSizeForStyle(index)"
      >
        <i
          v-if="progress[index]"
          class="bar-inner"
          :style="barInnerStyle(index)"
        ></i>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { stepsProps, useSteps } from './use-steps'
import MdIcon from 'mand-mobile/icon'

export default defineComponent({
  name: 'MdSteps',
  components: {
    MdIcon,
  },
  props: stepsProps,
  setup(props) {
    return {
      ...useSteps(props),
    }
  },
})
</script>

<style lang="stylus">
@import './index.styl'

.md-steps
  display flex
  justify-content space-around
  font-size 28px

  &.md-steps-horizontal
    align-items center
    padding 40px 100px 100px
    .step-wrapper
      margin 0 4px
      justify-content center
      align-items center
      flex-direction column
      &.reached
        .text-wrapper .name
          color var(--md-steps-text-color)
      &.current
        .text-wrapper .name
          color var(--md-steps-color-active)
    .text-wrapper
      top 100%
      padding-top var(--md-steps-text-gap-horizontal)
      text-align center
      .name
        color var(--md-steps-desc-color)
      .desc
        margin-top 10px
        color var(--md-steps-desc-color)
    &.no-current
      .reached:last-of-type
        display none !important

  &.md-steps-vertical
    align-items flex-start
    padding 40px
    flex-direction column
    &.vertical-adaptive
      justify-content normal
      padding 40px 40px 8px
      .bar.vertical-bar
        flex 1
    .step-wrapper
      width 100%
      margin 4px 0
      align-items stretch
      .icon-wrapper
        position relative
        .step-node-default
          min-width var(--md-steps-icon-size)
          min-height var(--md-steps-icon-size)
      .text-wrapper
        left var(--md-steps-icon-size)
        padding-left var(--md-steps-text-gap-vertical)
        .name, .desc
          white-space normal
        .name
          color var(--md-steps-text-color)
        .desc
          margin-top 18px
          color var(--md-steps-desc-color)

  .icon-wrapper
    display flex
    justify-content center
    align-items center
    color var(--md-steps-color)

    >div
      display flex
      justify-content center
      align-items center
    &:nth-child(2)
      display none

    .step-node-default-icon
      background var(--md-steps-color)

  .step-wrapper
    display flex
    position relative
    min-width var(--md-steps-icon-size)
    min-height var(--md-steps-icon-size)
    .icon-wrapper
      min-width var(--md-steps-icon-size)
      min-height var(--md-steps-icon-size)
      .md-icon
        width var(--md-steps-icon-size)
        height var(--md-steps-icon-size)
        font-size var(--md-steps-icon-size)
        line-height var(--md-steps-icon-size)
    .text-wrapper
      position absolute
      .name, .desc
        white-space nowrap
      .name
        line-height var(--md-steps-text-font-size)
        font-size var(--md-steps-text-font-size)
      .desc
        line-height var(--md-steps-text-font-size)
        font-size var(--md-steps-desc-font-size)
    &.reached, &.current
      .icon-wrapper
        color var(--md-steps-color-active)
        .step-node-default-icon
          background var(--md-steps-color-active)

  .bar
    position relative
    background-color var(--md-steps-color)
    overflow hidden
    .bar-inner
      z-index 10
      position absolute
      top 0
      left 0
      display block
      content ''
      transition all linear 1s
    &.horizontal-bar
      flex 1
      height var(--md-steps-border-size)
      .bar-inner
        width 100%
        height var(--md-steps-border-size)
        background-color var(--md-steps-color-active)
    &.vertical-bar
      left 16px
      width var(--md-steps-border-size)
      transform translateX(-50%)
      .bar-inner
        width var(--md-steps-border-size)
        height 100%
        background-color var(--md-steps-color-active)
    &:last-of-type
      &.horizontal-bar
        display none
      &.vertical-bar
        visibility hidden
</style>
