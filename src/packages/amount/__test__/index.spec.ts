import { mount } from '@vue/test-utils'
import Amount from '../index.vue'

describe('Amount.vue', () => {
  test('render', () => {
    const wrapper = mount(Amount, {
      props: {
        name: 'scan',
        hasSeparator: true,
        isRoundUp: false,
        transition: false,
      },
    })
    expect(wrapper.classes()).toContain('md-amount')
  })

  test('should number animation not lose precision', (done) => {
    const wrapper = mount({
      template: `
          <md-amount
          :value="val"
          :duration="1000"
          transition
          ref="amount">
          </md-amount>
      `,
      components: {
        [Amount.name]: Amount,
      },
      data() {
        return {
          val: 1000,
        }
      },
    })
    const instance: any = wrapper.vm.$refs.amount
    setTimeout(() => {
      expect(instance.value).toBe(1000)
      wrapper.vm.val = 20.66
    }, 2000)

    setTimeout(() => {
      expect(instance.value).toBe(20.66)
      done()
    }, 4000)
  })
})
