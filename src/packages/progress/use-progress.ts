import { ref, watch, onMounted } from 'vue'
import { inBrowser, Animate } from 'mand-mobile-next/utils'
import type { ExtractPropTypes, PropType } from 'vue'

export const progressProps = {
  size: {
    type: Number,
    default: 70,
  },
  width: {
    type: Number,
    default: 100,
  },
  color: {
    type: String,
    default: '#2F86F6',
  },
  borderColor: {
    type: String,
    default: 'rgba(0, 0, 0, .1)',
  },
  fill: {
    type: String,
    default: 'transparent',
  },
  linecap: {
    // butt | round
    type: String as PropType<
      'butt' | 'round' | 'square' | 'inherit'
    >,
    default: 'round',
  },
  rotate: {
    type: Number,
    default: 0,
  },
  value: {
    // progress control 0-1
    type: Number,
    default: 0,
  },
  transition: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: Number,
    default: 1000,
  },
}

export const useProgress = (
  props: ExtractPropTypes<typeof progressProps>
) => {
  const formatValue = ref(0)
  const isMounted = ref(false)

  const MountedInit = () => {
    isMounted.value = true
  }

  const noop = () => {}

  const DoAnimateDisplay = (fromValue = 0, toValue = 0) => {
    const step = (percent: number) => {
      formatValue.value =
        fromValue + (toValue - fromValue) * percent
    }

    const verify = (id: string | number) => id
    /* istanbul ignore next  */
    Animate.start(
      step,
      verify,
      noop,
      props.duration || 1000
    )
  }

  onMounted(() => {
    MountedInit()

    watch(
      () => props.value,
      (val, preVal) => {
        if (val) {
          if (
            (!inBrowser && !isMounted.value) ||
            !props.transition
          ) {
            formatValue.value = val
            return
          }
        }
        DoAnimateDisplay(preVal, val)
      },
      {
        immediate: true,
      }
    )
  })
  return {
    formatValue,
    isMounted,
  }
}
