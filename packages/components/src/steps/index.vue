<template>
  <div
    class="md-steps"
    :class="{
      'md-steps--vertical': direction == 'vertical',
      'md-steps--horizontal': direction == 'horizontal',
      'md-steps--adaptive': direction == 'vertical' && verticalAdaptive,
      'md-steps--no-current': currentLength % 1 !== 0
    }"
  >
  
    <template v-for="(step, index) of steps" >
      <div class="md-steps_wrapper"
        :key="`steps-${index}`"
        :class="[index < currentLength ? 'md-reached' : '', index === currentLength ? 'md-current' : '']"
      >
        <!-- Customize uniformly -->
        <!-- <div class="icon-wrapper" >
          <slot name="icon"></slot>
        </div> -->
        <!-- Customize uniformly -->
        <div class="md-steps_icon_wrapper">
          <template v-if="index < currentLength">
            <slot
              v-if="$scopedSlots.reached || $slots.reached"
              name="reached"
              :index="index"
            ></slot>
            <div class="md-steps_node--default">
              <div class="md-steps_node--default_icon" style="width: 6px;height: 6px;border-radius: 50%;"></div>
            </div>
          </template>
          <template v-else-if="index === currentLength">
            <!-- <slot
              v-if="$scopedSlots.current || $slots.current"
              name="current"
              :index="index"
            ></slot> -->
            <md-icon name="success"></md-icon>
          </template>
          <template v-else>
            <!-- <slot
              v-if="$scopedSlots.unreached || $slots.unreached"
              name="unreached"
              :index="index"
            ></slot> -->
            <div class="md-steps_node--default">
              <div class="md-steps_node--default_icon" style="width: 6px;height: 6px;border-radius: 50%;"></div>
            </div>
          </template>
        </div>
        <div class="md-steps--text-wrapper">
          <template>
            <div class="md-name">
              {{step.name}}
            </div>
            <div class="md-desc" v-if="step.text">
              {{step.text}}
            </div>
          </template>
        </div>      
      </div>
      <div class="md-bar"
        :class="[direction === 'horizontal' ? 'md-bar_horizontal' : 'md-bar_vertical']"
        :key="`bar-${index}`"
      >
        <i
          class="md-bar_inner"
          v-if="progress[index]"
          :style="{
            transform: `translate3d${barInnerTransform(index)}`,
            transition: `all ${progress[index]['time']}s linear`,
          }"
        ></i>
      </div>
    </template>
  </div>
</template>

<script>
import {toArray} from '@mand-mobile/shared/lib/util'
import Icon from '../icon'

export default {
  name: 'md-steps',

  components: {
    'md-icon': Icon,
  },

  props: {
    steps: {
      type: Array,
      default() {
        /* istanbul ignore next */
        return []
      },
    },
    current: {
      type: Number,
      default: 0,
      validator(val) {
        return val >= 0
      },
    },
    direction: {
      type: String,
      default: 'horizontal',
    },
    transition: {
      type: Boolean,
      default: false,
    },
    verticalAdaptive: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      initialed: false,
      progress: [],
      stepsSize: [],
      currentLength: 0,
      duration: 0.3,
      timer: null,
    }
  },

  computed: {
    $_barInnerStyle() {
      return index => {
        const {progress} = this
        const transform =
          this.direction === 'horizontal'
            ? `(${(progress[index]['len'] - 1) * 100}%, 0, 0)`
            : `(0, ${(progress[index]['len'] - 1) * 100}%, 0)`
        return {
          transform: `translate3d${transform}`,
          transition: `all ${progress[index]['time']}s linear`,
        }
      }
    },
    barInnerTransform() {
      return index => {
        const {progress} = this
        const step = (progress[index] && progress[index]['len']) || 0
        const transform =
          this.direction === 'horizontal' ? `(${(step - 1) * 100}%, 0, 0)` : `(0, ${(step - 1) * 100}%, 0)`
        return transform
      }
    },
  },

  watch: {
    current(val, oldVal) {
      const currentStep = this.$_formatValue(val)
      const newProgress = this.$_sliceProgress(currentStep)
      if (this.transition) {
        const isAdd = currentStep >= oldVal
        this.timer && clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$_doTransition(newProgress, isAdd, len => {
            if ((isAdd && len > this.currentLength) || (!isAdd && len < this.currentLength)) {
              this.currentLength = len
            }
          })
        }, 100)
      } else {
        this.progress = newProgress
        this.currentLength = currentStep
      }
    },
  },

  created() {
    const currentStep = this.$_formatValue(this.current)
    this.currentLength = currentStep
    this.progress = this.$_sliceProgress(currentStep)
  },
  mounted() {
    this.$_initStepSize()
  },
  updated() {
    this.$nextTick(() => {
      this.$_initStepSize()
    })
  },

  methods: {
    // MARK: private methods
    async $_initStepSize() {
      if (this.direction !== 'vertical' || this.verticalAdaptive) {
        return
      }
      const dom = await this.$MDDom()
      const iconWrappers = dom.querySelectorAll('.md-steps_icon_wrapper')
      const textWrappers = dom.querySelectorAll('.md-steps--text-wrapper')
      const stepsSize = toArray(textWrappers).map((wrapper, index) => {
        let stepHeight = wrapper.clientHeight
        const iconHeight = iconWrappers[index].clientHeight
        if (index === textWrappers.length - 1) {
          // The last step needs to subtract floated height
          stepHeight -= iconHeight
        } else {
          // Add spacing between steps to prevent distance too close
          stepHeight += 40
        }
        return stepHeight > 0 ? stepHeight : 0
      })

      if (stepsSize.toString() !== this.stepsSize.toString()) {
        this.stepsSize = stepsSize
      }
    },
    $_getStepSizeForStyle(index) {
      const size = this.direction === 'vertical' && !this.verticalAdaptive ? this.stepsSize[index] : 0
      return size
        ? {
            height: `${size}px`,
          }
        : null
    },
    $_getStepStatusClass(index) {
      const currentLength = this.currentLength

      let status = []

      if (index < currentLength) {
        status.push('reached')
      }

      if (index === Math.floor(currentLength)) {
        status.push('current')
      }

      return status.join(' ')
    },
    $_formatValue(val) {
      if (val < 0) {
        return 0
      } else if (val > this.steps.length - 1) {
        return this.steps.length - 1
      } else {
        return val
      }
    },
    $_sliceProgress(current) {
      return this.steps.slice(0, this.steps.length - 1).map((step, index) => {
        const offset = current - index
        const progress = this.progress[index]
        const isNewProgress = progress === undefined
        let len, time
        if (offset <= 0) {
          len = 0
        } else if (offset >= 1) {
          len = 1
        } else {
          len = offset
        }
        time = (isNewProgress ? len : Math.abs(progress.len - len)) * this.duration
        return {
          len,
          time,
        }
      })
    },
    $_doTransition(progress, isAdd, step) {
      let currentLength = isAdd ? 0 : this.currentLength
      const walk = index => {
        if ((index < progress.length) & (index > -1) && progress[index]) {
          if (isAdd) {
            currentLength += progress[index].len
          } else {
            currentLength -= this.progress[index].len - progress[index].len
          }

          setTimeout(() => {
            index += isAdd ? 1 : -1
            step(currentLength)
            walk(index)
          }, progress[index].time * 1000)
        }
        this.$set(this.progress, index, progress[index])
      }
      walk(isAdd ? 0 : progress.length - 1)
    },
  },
}

</script>

<style lang="stylus">
.md-steps
  display flex
  justify-content space-around
  font-size 28px

  &.md-steps--horizontal
    align-items center
    padding 40px 100px 100px
    .md-steps_wrapper
      margin 0 4px
      justify-content center
      align-items center
      flex-direction column
      &.md-reached
        .md-steps--text-wrapper .md-name
          color md-steps-text-color
      &.md-current
        .md-steps--text-wrapper .md-name
          color md-steps-color-active
    .md-steps--text-wrapper
      top 100%
      padding-top md-steps-text-gap-horizontal
      text-align center
      .md-name
        color md-steps-desc-color
      .md-desc
        margin-top 10px
        color md-steps-desc-color
    &.md-steps--no-current
      .md-reached:last-of-type
        display none !important

  &.md-steps--vertical
    align-items flex-start
    padding 40px
    flex-direction column
    &.md-steps--adaptive
      justify-content normal
      padding 40px 40px 8px
      .md-bar.md-bar_vertical
        flex 1
    .md-steps_wrapper
      width 100%
      margin 4px 0
      align-items stretch
      .md-steps_icon_wrapper
        position relative
        .md-steps_node--default
          min-width md-steps-icon-size
          min-height md-steps-icon-size
      .md-steps--text-wrapper
        left md-steps-icon-size
        padding-left md-steps-text-gap-vertical
        .md-name, .md-desc
          white-space normal
        .md-name
          color md-steps-text-color
        .md-desc
          margin-top 18px
          color md-steps-desc-color

  .md-steps_icon_wrapper
    display flex
    justify-content center
    align-items center
    color md-steps-color

    >div
      display flex
      justify-content center
      align-items center
    &:nth-child(2)
      display none

    .md-steps_node--default_icon
      background md-steps-color

  .md-steps_wrapper
    display flex
    position relative
    min-width md-steps-icon-size
    min-height md-steps-icon-size
    .md-steps_icon_wrapper
      min-width md-steps-icon-size
      min-height md-steps-icon-size
      .md-icon
        width md-steps-icon-size
        height md-steps-icon-size
        font-size md-steps-icon-size
        line-height md-steps-icon-size
    .md-steps--text-wrapper
      position absolute
      .md-name, .md-desc
        white-space nowrap
      .md-name
        line-height md-steps-text-font-size
        font-size md-steps-text-font-size
      .md-desc
        line-height md-steps-text-font-size
        font-size md-steps-desc-font-size
    &.md-reached, &.md-current
      .md-steps_icon_wrapper
        color md-steps-color-active
        .md-steps_node--default_icon
          background md-steps-color-active

  .md-bar
    position relative
    background-color md-steps-color
    overflow hidden
    .md-bar_inner
      z-index 10
      position absolute
      top 0
      left 0
      display block
      content ''
      transition all linear 1s
    &.md-bar_horizontal
      flex 1
      height md-steps-border-size
      .md-bar_inner
        width 100%
        height md-steps-border-size
        background-color md-steps-color-active
    &.md-bar_vertical
      left 16px
      width md-steps-border-size
      transform translateX(-50%)
      min-height 110px
      .md-bar_inner
        width md-steps-border-size
        height 100%
        background-color md-steps-color-active
    &:last-of-type
      &.md-bar_horizontal
        display none
      &.md-bar_vertical
        visibility hidden
</style>
