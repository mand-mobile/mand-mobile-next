import { mount } from '@vue/test-utils'
import Codebox from '../index.vue'

describe('Codebox.vue', () => {
  test('render', () => {
    const wrapper = mount(Codebox, {
      props: {},
    })
    expect(wrapper.classes()).toContain(
      'md-codebox-wrapper'
    )
  })
})
