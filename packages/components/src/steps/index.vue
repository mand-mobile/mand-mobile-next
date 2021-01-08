<template>
  <div
    class="md-steps"
    :class="[
      direction == 'horizontal' ? 'md-steps--horizontal' : 'md-steps--vertical',
      direction == 'horizontal' || adaptive ? 'md-steps--adaptive' : '',
      currentLength % 1 !== 0 ? 'md-steps--no-current': '',
      `md-steps--padding-${padding}`
    ]"
  >
    <template v-for="(step, index) of steps">
      <md-step-horizontal
        v-if="direction == 'horizontal'"
        class="md-steps_item--horizontal"
        :step="step"
        :index="index"
        :progress="progress[index]"
        :dislocation="dislocation && (index % 2 === 0)"
        :is-reached="index < currentLength"
        :is-current="index === currentLength"
        :is-last="index === steps.length - 1"
        :key="step.index"
        :slots="{
          icon: $scopedSlots.icon,
          content: $scopedSlots.content
        }"
        :style="{
          flex: step.flex || 1
        }"
      >
        <template #icon>
          <slot name="icon" :index="index" :current-index="currentLength"/>
        </template>
        <template #reached>
          <slot name="reached" :index="index">
            <md-step-node active/>
          </slot>
        </template>
        <template #current>
          <slot name="current" :index="index">
            <md-icon name="success"></md-icon>
          </slot>
        </template>
        <template #unreached>
          <slot name="unreached" :index="index">
            <md-step-node/>
          </slot>
        </template>
        <template #content>
          <slot name="content" :index="index" :step="step"/>
        </template>
      </md-step-horizontal>
      <md-step-vertical
        v-else
        class="md-steps_item--vertical"
        :step="step"
        :index="index"
        :progress="progress[index]"
        :dislocation="dislocation && (index % 2 === 0)"
        :adaptive="adaptive"
        :is-reached="index < currentLength"
        :is-current="index === currentLength"
        :is-last="index === steps.length - 1"
        :key="step.index"
        :slots="{
          icon: $scopedSlots.icon,
          content: $scopedSlots.content
        }"
      >
        <template #icon>
          <slot name="icon" :index="index" :current-index="currentLength"/>
        </template>
        <template #reached>
          <slot name="reached" :index="index">
            <md-step-node active/>
          </slot>
        </template>
        <template #current>
          <slot name="current" :index="index">
            <md-icon name="success"></md-icon>
          </slot>
        </template>
        <template #unreached>
          <slot name="unreached" :index="index">
            <md-step-node/>
          </slot>
        </template>
        <template #content>
          <slot name="content" :index="index" :step="step"/>
        </template>
      </md-step-vertical>
    </template>
  </div>
</template>

<script>
import StepVertical from './step-vertical'
import StepHorizontal from './step-horizontal'
import StepNode from './step-node'
import Icon from '../icon'

const POS_TOP = 'top'
const POS_BOTTOM = 'bottom'
const POS_DIS = 'dislocation'

export default {
  name: 'md-steps',

  components: {
    'md-step-horizontal': StepHorizontal,
    'md-step-vertical': StepVertical,
    'md-step-node': StepNode,
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
    dislocation: {
      type: Boolean,
      default: false,
    },
    transition: {
      type: Boolean,
      default: false,
    },
    adaptive: {
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
    padding() {
      if (this.dislocation) {
        return POS_DIS
      }

      let equal = false
      const res = this.steps.every(step => {
        const pos = step.textPosition || POS_BOTTOM
        equal = pos === this.steps[0].textPosition || pos === POS_BOTTOM
        return pos === POS_TOP
      })

      if (res) {
        return POS_TOP
      } else if (equal) {
        return POS_BOTTOM
      } else {
        return POS_DIS
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
        if (this.timer) {
          clearTimeout(this.timer)
        }
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

  methods: {
    // MARK: private methods
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
  box-sizing border-box

  &.md-steps--horizontal
    align-items center
    padding 40px 0 100px
    &.md-steps--adaptive
      width 100%
      .md-steps_item--horizontal
        flex 1
        &:last-of-type
          display contents
    &.md-steps--padding-dislocation
      padding 100px 0
    &.md-steps--padding-top
      padding 100px 0 40px

  &.md-steps--vertical
    align-items flex-start
    flex-direction column
    padding 40px
    &.md-steps--adaptive
      height 100%
      padding 0
      justify-content normal 
      .md-steps_item--vertical  // uni
        flex 1
        &:last-of-type
          display contents
</style>
