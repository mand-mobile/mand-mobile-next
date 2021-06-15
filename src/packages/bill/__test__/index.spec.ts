import { mount } from '@vue/test-utils'
import Bill from '../index.vue'

describe('Bill.vue', () => {
  test('render', () => {
    const wrapper = mount(Bill, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-bill')
  })
})
