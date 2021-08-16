import { ref, onUpdated, onMounted, computed } from 'vue'
import type { SetupContext } from 'vue'
interface InoticeProps {
  mode: string
  time: number
  scrollable: boolean
}

export const useNotice = (
  props: InoticeProps,
  { emit, slots }: SetupContext<'close'[]>
) => {
  const isShow = ref(true)
  const overflow = ref(false)
  const wrap = ref<HTMLElement | null>(null)
  const content = ref<HTMLElement | null>(null)

  const customLeft = computed(() => {
    return !!slots?.left
  })
  const customRight = computed(() => {
    return !!slots?.right
  })

  const rightIcon = computed(() => {
    return props.mode === 'link' ? 'arrow-right' : 'close'
  })

  const hide = (time: number) => {
    setTimeout(() => {
      isShow.value = false
    }, time)
  }

  const close = () => {
    if (props.mode === 'closable') {
      isShow.value = false
    }
    emit('close')
  }

  const checkOverflow = () => {
    if (!props.scrollable) {
      return
    }
    if (!content.value || !wrap.value) return
    /**
     * 计算 padding-left 对宽度的影响
     * 替换 clientWidth 为 getBoundingClientRect
     */
    const paddingLeft: string =
      window
        .getComputedStyle(content.value, null)
        .getPropertyValue('padding')
        .split(' ')[3] || '0px'
    const left = +(paddingLeft.match(/\d+/g)?.[0] ?? 0)

    overflow.value =
      content.value.scrollWidth - left >
      Math.ceil(wrap.value.getBoundingClientRect().width)
  }

  onUpdated(() => {
    checkOverflow()
  })

  onMounted(() => {
    if (props.time) {
      hide(props.time)
    }
    checkOverflow()
  })

  return {
    isShow,
    customLeft,
    customRight,
    rightIcon,
    overflow,
    close,
    wrap,
    content,
  }
}
