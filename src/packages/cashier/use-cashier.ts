import { ref, computed, reactive, watch } from 'vue'
import { useShow } from 'mand-mobile/composable'
import { t } from 'mand-mobile/locale'
import {
  UPDATE_VISIBLE_EVENT,
  UPDATE_MODEL_EVENT,
  HIDE_EVENT,
  SHOW_EVENT,
  noop,
} from 'mand-mobile/utils'

import type {
  ExtractPropTypes,
  PropType,
  SetupContext,
} from 'vue'

export const cashierProps = {
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: t('md.cashier.pay'), // 支付
  },
  describe: {
    type: String,
    default: '',
  },
  channels: {
    type: Array as PropType<
      Array<{
        value: string | number
        text: string
        icon?: string
        iconSvg?: boolean
        img?: string
        disabled?: boolean
        desc?: string
        action?: {
          text: string
          handler: (...arg: unknown[]) => void
        }
      }>
    >,
    default: () => [],
  },
  channelLimit: {
    type: Number,
    default: 2,
  },
  defaultIndex: {
    type: Number,
    default: 0,
  },
  paymentTitle: {
    type: String,
    default: t('md.cashier.payCash'), // 支付金额
  },
  paymentAmount: {
    type: String,
    default: '0.00',
  },
  paymentDescribe: {
    type: String,
    default: '',
  },
  payButtonText: {
    type: String,
    default: t('md.cashier.confirmPay'), // 确定支付
  },
  payButtonDisabled: {
    type: Boolean,
    default: false,
  },
  moreButtonText: {
    type: String,
    default: t('md.cashier.morePayWays'), // 更多支付方式
  },
}

export const useCashier = (
  props: ExtractPropTypes<typeof cashierProps>,
  {
    emit,
  }: SetupContext<
    (
      | 'hide'
      | 'update:visible'
      | 'show'
      | 'select'
      | 'pay'
    )[]
  >
) => {
  const { popupShow, onShow, onHide, hide } = useShow(
    props,
    emit
  )

  const scene =
    ref<
      'choose' | 'captcha' | 'loading' | 'success' | 'fail'
    >('choose')
  const sceneOption = reactive({
    loading: {
      text: t('md.cashier.payResultSearch'), // 支付结果查询中...
    },
    success: {
      text: t('md.cashier.paySuccess'), // 支付成功
      buttonText: t('md.cashier.confirm'), // 我知道了
      handler: null,
    },
    fail: {
      text: t('md.cashier.payFail'), // 支付失败，请稍后重试
      buttonText: t('md.cashier.confirm'), // 我知道了
      handler: null,
    },
    captcha: {
      text: '',
      brief: '',
      maxlength: 4,
      count: 60,
      autoCountdown: true,
      onSend: noop,
      onSubmit: noop,
      countNormalText: '',
      countActiveText: '',
    },
  })

  const currentPayChannelValue = ref(
    props.channels[0].value
  )
  watch(currentPayChannelValue, (val) => {
    emit('select', val)
  })

  const payHandler = () => {
    emit('pay', currentPayChannelValue)
  }

  const next = (
    sceneStage: Exclude<typeof scene.value, 'choose'>,
    options: Record<string, any> = {}
  ) => {
    scene.value = sceneStage
    sceneOption[scene.value] = {
      ...sceneOption[scene.value],
      ...options,
    } as any
  }

  return {
    popupShow,
    onShow,
    onHide,
    hide,
    scene,
    sceneOption,
    currentPayChannelValue,
    payHandler,
    next,
  }
}

export const channelProps = {
  paymentTitle: {
    type: String,
    default: '',
  },
  paymentAmount: {
    type: String,
    default: '',
  },
  paymentDescribe: {
    type: String,
    default: '',
  },
  moreButtonText: {
    type: String,
    default: '',
  },
  payButtonText: {
    type: String,
    default: '',
  },
  payButtonDisabled: {
    type: Boolean,
    default: false,
  },
  channels: {
    type: Array as PropType<
      ExtractPropTypes<typeof cashierProps>['channels']
    >,
    default: '',
  },
  channelLimit: {
    type: Number,
    default: 0,
  },
  modelValue: {
    type: [Number, String],
    default: '',
  },
}

export const useChannel = (
  props: ExtractPropTypes<typeof channelProps>,
  { emit }: SetupContext<('pay' | 'update:modelValue')[]>
) => {
  const innerValue = computed({
    get: () => props.modelValue,
    set: (val) => emit(UPDATE_MODEL_EVENT, val),
  })
  const isSingle = computed(() => {
    if (props.channelLimit < 1) return true
    return props.channels.length > props.channelLimit
  })

  const currentIndex = computed(() =>
    props.channels.findIndex(
      (channel) => channel.value === props.modelValue
    )
  )

  const isChannelShow = ref(false)
  const toggleShowAllChannel = () => {
    isChannelShow.value = !isChannelShow.value
  }

  const channelPayClick = () => {
    const item = props.channels[currentIndex.value]
    emit('pay', item)
  }

  const displayChannels = computed(() => {
    if (isChannelShow.value) {
      return props.channels
    } else {
      return [
        props.channels[
          currentIndex.value !== -1 ? currentIndex.value : 0
        ],
      ]
    }
  })

  return {
    innerValue,
    isSingle,
    currentIndex,
    isChannelShow,
    toggleShowAllChannel,
    channelPayClick,
    displayChannels,
  }
}
