<script lang="ts">
import { defineComponent, h, ref, watch } from 'vue'
import { inBrowser } from 'mand-mobile-next/utils'
import {
  amountProps as props,
  useAmount,
} from './use-amount'

export default defineComponent({
  name: 'MdAmount',
  props,
  setup(props, { slots }) {
    const defaultSlots = slots.default?.() || []
    const unitSlots = slots.unit?.() || []

    const {
      doFormat,
      doPrecision,
      doCapital,
      doAnimateDisplay,
    } = useAmount(props)

    const innerValue: any = () =>
      props.value ||
      defaultSlots[0]?.children?.toString().trim() ||
      0

    const animationValue = ref(0)
    props.transition &&
      watch(
        () => props.value,
        (val, oldVal) => {
          doAnimateDisplay(animationValue, oldVal, val)
        },
        {
          immediate: true,
        }
      )

    const content = () => [
      props.unit || unitSlots,
      !props.transition
        ? !props.isCapital
          ? !inBrowser
            ? innerValue()
            : doFormat(doPrecision(innerValue()))
          : doCapital(innerValue())
        : null,
      props.transition
        ? doFormat(doPrecision(animationValue.value + ''))
        : null,
    ]

    return () =>
      h(
        'span',
        {
          class: {
            'md-amount': true,
            numerical: !props.isCapital,
          },
        },
        props.reverse ? content().reverse() : content()
      )
  },
})
</script>

<style lang="stylus">
.md-amount
  &.numerical
    font-family var(--md-font-family-number)
</style>
