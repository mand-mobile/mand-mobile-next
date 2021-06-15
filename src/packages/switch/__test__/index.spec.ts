import { mount } from '@vue/test-utils'
import Switch from '../index.vue'

describe('Switch.vue', () => {
  test('render', () => {
    const wrapper = mount(Switch, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-switch')
  })
})
