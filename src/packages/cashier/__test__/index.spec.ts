import { mount } from '@vue/test-utils'
import Cashier from '../index'
import demo from '../demo/demo0.vue'

describe('Cashier.vue', () => {
  test('render', () => {
    const wrapper = mount(demo)
    expect(
      document.querySelector('.md-cashier')
    ).toBeTruthy()
    wrapper.unmount()
  })

  test('install', () => {
    expect(
      require('vue').createApp(Cashier).use(Cashier)
    ).toBeTruthy()
  })
})
