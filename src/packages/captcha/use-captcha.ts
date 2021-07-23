import { ref, watchEffect, nextTick, watch } from 'vue'
import { t } from 'mand-mobile-next/locale'
import { useShow } from 'mand-mobile-next/composable'
import {
  UPDATE_VISIBLE_EVENT,
  HIDE_EVENT,
  SHOW_EVENT,
  SUBMIT_EVNENT,
} from 'mand-mobile-next/utils'
import type {
  ExtractPropTypes,
  PropType,
  ComponentPublicInstance,
  SetupContext,
} from 'vue'

type EmitsType = (
  | 'update:visible'
  | 'show'
  | 'hide'
  | 'submit'
  | 'send'
)[]

export const captchaProps = {
  title: {
    type: String,
  },
  brief: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
  visible: {
    type: Boolean,
    default: false,
  },
  maxlength: {
    type: Number,
    default: 4,
  },
  mask: {
    type: Boolean,
    default: false,
  },
  system: {
    type: Boolean,
    default: false,
  },
  autoSend: {
    type: Boolean,
    default: true,
  },
  autoCountdown: {
    type: Boolean,
    default: true,
  },
  count: {
    type: Number,
    default: 60,
  },
  countNormalText: {
    type: String,
    default: t('md.captcha.sendCaptcha'),
  },
  countActiveText: {
    type: String,
    default: t('md.captcha.countdown'),
  },
  isView: {
    type: Boolean,
    default: false,
  },
}

export const SEND_EVENT = 'send'
export const emits: EmitsType = [
  UPDATE_VISIBLE_EVENT,
  HIDE_EVENT,
  SHOW_EVENT,
  SUBMIT_EVNENT,
  SEND_EVENT,
]

export const useCaptcha = (
  props: ExtractPropTypes<typeof captchaProps>,
  { emit }: SetupContext<EmitsType>
) => {
  const { popupShow, onShow, onHide, hide } = useShow(
    props,
    emit
  )

  const codeboxRef =
    ref<ComponentPublicInstance<any> | null>(null)
  const showHandler = () => {
    codeboxRef.value.focusHandler()
    onShow()
  }
  const hideHandler = () => {
    code.value = ''
    onHide()
  }

  const code = ref('')
  const submitHandler = () => {
    emit(SUBMIT_EVNENT, code.value)
  }
  watchEffect(() => {
    if (code.value.length === props.maxlength) {
      submitHandler()
    }
  })

  const isCounting = ref(false)
  const countBtnText = ref('')
  let timer: number
  let i = props.count
  const countdown = () => {
    if (!i) return
    isCounting.value = true
    countBtnText.value = props.countActiveText.replace(
      '{$1}',
      `${i}`
    )

    timer = globalThis.setInterval(() => {
      if (i <= 1) {
        resetCountdown()
      } else {
        i -= 1
        countBtnText.value = props.countActiveText.replace(
          '{$1}',
          `${i}`
        )
      }
    }, 1000) as unknown as number
  }

  const resetCountdown = () => {
    isCounting.value = false
    countBtnText.value = props.countNormalText
    clearInterval(timer)
  }

  const errorMsg = ref('')
  const setError = (msg: string) => {
    nextTick(() => {
      errorMsg.value = msg
    })
  }

  const sendHandler = () => {
    if (props.autoSend) {
      emit(SEND_EVENT, countdown)
      props.autoCountdown && countdown()
    }
  }

  const stopWatcher = watch(popupShow, (val) => {
    if (val) {
      sendHandler()
    }
    stopWatcher()
  })

  return {
    popupShow,
    onShow: showHandler,
    onHide: hideHandler,
    hide,
    code,
    errorMsg,
    countBtnText,
    isCounting,
    codeboxRef,
    countdown,
    setError,
    sendHandler,
  }
}
