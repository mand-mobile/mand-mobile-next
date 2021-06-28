import { mount } from '@vue/test-utils'
import Codebox from '../index'
import demo0 from '../demo/demo0.vue'

describe('Codebox.vue', () => {
  test('render', () => {
    const wrapper = mount(Codebox, {
      props: {},
    })
    expect(wrapper.classes()).toContain(
      'md-codebox-wrapper'
    )
    wrapper.unmount()
  })

  test('input', async () => {
    const wrapper = mount(demo0)

    const keyone = document.body.querySelector(
      '.keyboard-key-item'
    )

    for (const i of [4, 3, 2, 1]) {
      keyone?.dispatchEvent(new Event('touchstart'))
      keyone?.dispatchEvent(new Event('touchend'))
      await Promise.resolve()
    }
    expect(wrapper.vm.code).toBe('1111')

    const deleteKey = document.body.querySelector('.delete')
    for (const i of [4, 3]) {
      deleteKey?.dispatchEvent(new Event('touchstart'))
      deleteKey?.dispatchEvent(new Event('touchend'))
      await Promise.resolve()
    }
    expect(wrapper.vm.code).toBe('11')
    wrapper.unmount()
  })

  test('install', () => {
    expect(
      require('vue').createApp(Codebox).use(Codebox)
    ).toBeTruthy()
  })
})
