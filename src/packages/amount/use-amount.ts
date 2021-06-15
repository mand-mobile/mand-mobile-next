import { formatMoney } from 'mand-mobile/input-item'
import { Animate, noop } from 'mand-mobile/utils'
import { capitalize } from './number-capital'
import type { ExtractPropTypes } from 'vue'

export const amountProps = {
  value: {
    type: Number,
    default: undefined,
  },
  precision: {
    type: Number,
    default: 2,
  },
  isRoundUp: {
    type: Boolean,
    default: true,
  },
  hasSeparator: {
    type: Boolean,
    default: false,
  },
  separator: {
    type: String,
    default: ',',
  },
  unit: {
    type: String,
    default: '',
  },
  reverse: {
    type: Boolean,
    default: false,
  },
  transition: {
    type: Boolean,
    default: false,
  },
  isCapital: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: Number,
    default: 1000,
  },
}

export const useAmount = (
  props: ExtractPropTypes<typeof amountProps>
) => {
  const doPrecision = (value: string) => {
    const exponentialForm = Number(
      `${value}e${props.precision}`
    )
    const rounded = props.isRoundUp
      ? Math.round(exponentialForm)
      : Math.floor(exponentialForm)
    return Number(`${rounded}e-${props.precision}`).toFixed(
      props.precision
    )
  }

  const doCapital = (value: any) => {
    return capitalize(value)
  }

  const doFormat = (value: string) => {
    if (!props.hasSeparator) {
      return value
    }
    const numberParts = value.split('.')
    const isNegative = Number(numberParts[0]) < 0

    return `${isNegative ? '-' : ''}${formatMoney(
      numberParts[0].replace(/^\-/, ''),
      props.separator
    )}.${numberParts[1]}`
  }

  const doAnimateDisplay = (
    innerValue: any,
    fromValue = 0,
    toValue = 0
  ) => {
    if (!props.transition) return innerValue.value

    const step = (percent: any) => {
      if (percent === 1) {
        innerValue.value = toValue
        return
      }
      innerValue.value =
        fromValue + (toValue - fromValue) * percent
    }

    const verify = (id: any) => id
    Animate.start(step, verify, noop, props.duration)

    return innerValue.value
  }

  return {
    doPrecision,
    doCapital,
    doFormat,
    doAnimateDisplay,
  }
}
