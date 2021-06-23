import { ref, onBeforeUnmount } from 'vue'
import { SetupContext } from 'vue'

export const SHOW = 'show'
export const HIDE = 'hide'

interface IToastProps {
  duration: number
}
export const useToast = (
  props: IToastProps,
  { emit }: SetupContext
) => {
  const onShow = () => {
    emit(SHOW)
  }
  const onHide = () => {
    emit(HIDE)
  }

  const hide = () => {
    isPopupShow.value = false
  }
  const show = () => {
    isPopupShow.value = true
    fire()
  }

  let timer: number
  const isPopupShow = ref(false)
  const fire = () => {
    if (timer) {
      clearTimeout(timer)
    }
    if (isPopupShow.value && props.duration) {
      timer = globalThis.setTimeout(() => {
        hide()
      }, props.duration) as unknown as number
    }
  }

  onBeforeUnmount(() => {
    if (timer) {
      clearTimeout(timer)
    }
  })

  return {
    onShow,
    onHide,

    show,
    hide,

    fire,

    isPopupShow,
  }
}
