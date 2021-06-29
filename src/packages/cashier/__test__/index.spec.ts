import { mount } from '@vue/test-utils'
import Cashier from '../index'

describe('Cashier.vue', () => {
  test('render', () => {
    const wrapper = mount(Cashier, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-cashier')
  })
})
