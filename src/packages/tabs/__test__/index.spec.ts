import { mount } from '@vue/test-utils'
import Tabs from '../index.vue'

describe('Tabs.vue', () => {
  test('render', () => {
    const wrapper = mount(Tabs, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-tabs')
  })
})
