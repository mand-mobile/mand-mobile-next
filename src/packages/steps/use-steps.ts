import {
  ref,
  watch,
  onMounted,
  reactive,
  onUpdated,
  nextTick,
} from 'vue'

import type { ExtractPropTypes } from 'vue'
import { toArray } from 'mand-mobile/utils'

export const stepsProps = {
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
    validator(val: number) {
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
}

export const useSteps = (
  props: ExtractPropTypes<typeof stepsProps>
) => {
  const initialed = ref(false)
  const currentLength = ref(0)
  const duration = ref(0.3)
  const timer =
    ref<ReturnType<typeof setTimeout> | null>(null)
  const stepsRef = ref<HTMLInputElement | null>(null)
  const state = reactive<{
    progress: Array<{ len: number; time: number }>
    stepsSize: Array<number>
  }>({
    progress: [],
    stepsSize: [],
  })

  const barInnerStyle = (index: number) => {
    const { direction } = props
    const transform =
      direction === 'horizontal'
        ? `(${
            (state.progress[index]['len'] - 1) * 100
          }%, 0, 0)`
        : `(0, ${
            (state.progress[index]['len'] - 1) * 100
          }%, 0)`
    return {
      transform: `translate3d${transform}`,
      transition: `all ${state.progress[index]['time']}s linear`,
    }
  }

  // methods
  const initStepSize = () => {
    const { direction, verticalAdaptive } = props
    if (direction !== 'vertical' || verticalAdaptive) {
      return
    }

    const iconWrappers =
      (stepsRef.value &&
        stepsRef.value.querySelectorAll('.icon-wrapper')) ||
      []

    const textWrappers =
      (stepsRef.value &&
        stepsRef.value.querySelectorAll('.text-wrapper')) ||
      []

    const stepsSizeNew = toArray(textWrappers as any[]).map(
      (wrapper: HTMLInputElement, index: number) => {
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
      }
    )

    if (
      stepsSizeNew.toString() !== state.stepsSize.toString()
    ) {
      state.stepsSize = stepsSizeNew
    }
  }

  const formatValue = (val: number) => {
    if (val < 0) {
      return 0
    } else if (val > props.steps.length - 1) {
      return props.steps.length - 1
    } else {
      return val
    }
  }

  const getStepSizeForStyle = (index: number) => {
    const { direction, verticalAdaptive } = props
    const size =
      direction === 'vertical' && !verticalAdaptive
        ? state.stepsSize[index]
        : 0

    return size
      ? {
          height: `${size}px`,
        }
      : null
  }

  const sliceProgress = (current: number) => {
    const { steps } = props

    return steps
      .slice(0, steps.length - 1)
      .map((step, index) => {
        const offset = current - index
        const progressCur = state.progress[index]
        const isNewProgress = progressCur === undefined
        let len = 0
        if (offset <= 0) {
          len = 0
        } else if (offset >= 1) {
          len = 1
        } else {
          len = offset
        }
        const time =
          (isNewProgress
            ? len
            : Math.abs(progressCur.len - len)) *
          duration.value
        return {
          len,
          time,
        }
      })
  }

  const doTransition = (
    progress: Array<{ len: number; time: number }>,
    isAdd: boolean,
    step: { (len: number): void; (arg0: number): void }
  ) => {
    let currentLengthCur = isAdd ? 0 : currentLength.value
    const walk = (index: number) => {
      if (
        index < progress.length &&
        index > -1 &&
        progress[index]
      ) {
        if (isAdd) {
          currentLengthCur += progress[index].len
        } else {
          currentLengthCur -=
            progress[index].len - progress[index].len
        }

        setTimeout(() => {
          index += isAdd ? 1 : -1
          step(currentLengthCur)
          walk(index)
        }, progress[index].time * 1000)
      }
    }
    walk(isAdd ? 0 : progress.length - 1)
  }

  const getStepStatusClass = (index: number) => {
    const status = []

    if (index < currentLength.value) {
      status.push('reached')
    }

    if (index === Math.floor(currentLength.value)) {
      status.push('current')
    }

    return status.join(' ')
  }

  // created
  const currentStep = formatValue(props.current)
  currentLength.value = currentStep
  state.progress = sliceProgress(currentStep)

  watch(
    () => props.current,
    (newval) => {
      const currentStep = formatValue(newval)
      const newProgress = sliceProgress(currentStep)

      if (props.transition) {
        const isAdd = currentStep >= 0
        timer.value && clearTimeout(timer.value)
        timer.value = setTimeout(() => {
          doTransition(
            newProgress,
            isAdd,
            (len: number) => {
              if (
                (isAdd && len > currentLength.value) ||
                (!isAdd && len < currentLength.value)
              ) {
                currentLength.value = len
              }
            }
          )
        }, 100)
      } else {
        state.progress = newProgress
        currentLength.value = currentStep
      }
    },
    {
      immediate: true,
    }
  )

  onMounted(() => {
    initStepSize()
  })

  onUpdated(() => {
    nextTick(() => {
      initStepSize()
    })
  })

  return {
    initialed,
    progress: state.progress,
    stepsSize: state.stepsSize,
    currentLength,
    duration,
    timer,
    stepsRef,

    barInnerStyle,
    doTransition,
    sliceProgress,
    initStepSize,
    formatValue,
    getStepSizeForStyle,
    getStepStatusClass,
  }
}
