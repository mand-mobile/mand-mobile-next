import { ref, watch, onMounted, computed } from 'vue'
import { UPDATE_MODEL_EVENT } from 'mand-mobile-next/utils'

import type {
  PropType,
  ExtractPropTypes,
  SetupContext,
} from 'vue'

export const MASK_CLICK = 'maskClick'
export const SHOW = 'show'
export const HIDE = 'hide'
export const BEFORE_SHOW = 'beforeShow'
export const BEFORE_HIDE = 'beforeHide'

export const popupProps = {
  modelValue: {
    type: Boolean,
    default: false,
  },
  appendToBody: {
    type: Boolean,
    default: true,
  },
  position: {
    type: String as PropType<
      'center' | 'top' | 'bottom' | 'left' | 'right'
    >,
    default: 'center',
  },
  transition: {
    type: String as PropType<
      | 'md-slide-up'
      | 'md-slide-down'
      | 'md-slide-right'
      | 'md-slide-left'
      | string
    >,
    default: '',
  },
  hasMask: {
    type: Boolean,
    default: true,
  },
  maskClosable: {
    type: Boolean,
    default: true,
  },
  preventScroll: {
    type: Boolean,
    default: false,
  },
  preventScrollExclude: {
    type: [Object, String] as PropType<
      HTMLElement | string
    >,
    default: undefined,
  },
}

export const usePop = (
  props: ExtractPropTypes<typeof popupProps>,
  {
    emit,
  }: SetupContext<
    (
      | 'update:modelValue'
      | 'maskClick'
      | 'show'
      | 'hide'
      | 'beforeShow'
      | 'beforeHide'
    )[]
  >
) => {
  const isPopupShow = ref(false)
  const maskRef = ref<HTMLElement | null>(null)
  const boxRef = ref<HTMLElement | null>(null)

  const currentTransition = computed(() => {
    if (props.transition) return props.transition
    switch (props.position) {
      case 'bottom':
        return 'md-slide-up'
      case 'top':
        return 'md-slide-down'
      case 'left':
        return 'md-slide-right'
      case 'right':
        return 'md-slide-left'
      default:
        return 'md-fade'
    }
  })

  const popupMaskClick = () => {
    if (props.maskClosable) {
      emit(MASK_CLICK)
      hidePopup()
    }
  }

  function hidePopup() {
    emit(UPDATE_MODEL_EVENT, false)
  }

  function popupLeave() {
    isPopupShow.value = false
    emit(HIDE)
  }

  function popupAppear() {
    emit(SHOW)
  }

  function beforePopupAppear() {
    emit(BEFORE_SHOW)
  }

  function beforePopupLeave() {
    emit(BEFORE_HIDE)
  }

  onMounted(() => {
    const excluder =
      typeof props.preventScrollExclude === 'string'
        ? boxRef.value?.querySelector(
            props.preventScrollExclude
          )
        : props.preventScrollExclude

    const excludeHandler = (toggle = true) => {
      if (
        props.preventScroll &&
        maskRef.value &&
        boxRef.value &&
        excluder
      ) {
        preventScroll(
          toggle,
          maskRef.value,
          boxRef.value,
          excluder as HTMLElement
        )
      }
    }

    watch(
      () => props.modelValue,
      (val) => {
        if (val) {
          isPopupShow.value = val
          excludeHandler()
        } else {
          excludeHandler(false)
        }
      },
      {
        immediate: true,
      }
    )
  })

  return {
    isPopupShow,
    currentTransition,

    boxRef,
    maskRef,

    popupMaskClick,

    popupLeave,
    popupAppear,

    beforePopupAppear,
    beforePopupLeave,
  }
}

function preventScroll(
  toggle: boolean,
  mask: HTMLElement,
  box: HTMLElement,
  excluder?: HTMLElement
) {
  const handler = toggle
    ? 'addEventListener'
    : 'removeEventListener'

  mask?.[handler]('touchmove', preventDefault, false)
  box?.[handler]('touchmove', preventDefault, false)

  preventScrollExclude(toggle, excluder)
}

function preventScrollExclude(
  toggle: boolean,
  excluder?: HTMLElement
) {
  const handler = toggle
    ? 'addEventListener'
    : 'removeEventListener'
  excluder?.[handler](
    'touchmove',
    stopImmediatePropagation,
    false
  )
}

function preventDefault(e: Event) {
  e.preventDefault()
}

function stopImmediatePropagation(e: Event) {
  e.stopImmediatePropagation()
}
