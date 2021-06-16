import { mount } from '@vue/test-utils'
import Selector from '../index.vue'

describe('Selector.vue', () => {
  test('render', () => {
    const wrapper = mount(Selector, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-selector')
  })
})
