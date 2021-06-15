import { mount } from '@vue/test-utils'
import Amount from '../index.vue'

describe('Amount.vue', () => {
  test('render', () => {
    const wrapper = mount(Amount, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-amount')
  })
})
