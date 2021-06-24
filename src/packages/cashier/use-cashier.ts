import { ref } from 'vue'
import { useShow } from 'mand-mobile/composable'
import { t } from 'mand-mobile/locale'
import {
  UPDATE_VISIBLE_EVENT,
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
        text: string
        value: string | number
        icon: string
        iconSvg: boolean
        img: string
        action: (...arg: unknown[]) => void
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
  { emit }: SetupContext
) => {
  const { popupShow, onShow, onHide, hide } = useShow(
    props,
    emit
  )

  const scene =
    ref<
      'choose' | 'captcha' | 'loading' | 'success' | 'fail'
    >('choose')
  const sceneOption = {
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
    },
  }

  return {
    popupShow,
    onShow,
    onHide,
    hide,
    scene,
    sceneOption,
  }
}
