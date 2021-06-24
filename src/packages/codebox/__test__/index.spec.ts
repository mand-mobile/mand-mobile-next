import { mount } from '@vue/test-utils'
import Codebox from '../index'

describe('Codebox.vue', () => {
  test('render', () => {
    const wrapper = mount(Codebox, {
      props: {},
    })
    expect(wrapper.classes()).toContain(
      'md-codebox-wrapper'
    )
  })

  test('install', () => {
    expect(
      require('vue').createApp(Codebox).use(Codebox)
    ).toBeTruthy()
  })
})
