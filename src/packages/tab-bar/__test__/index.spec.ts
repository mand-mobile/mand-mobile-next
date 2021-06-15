import { mount } from '@vue/test-utils'
import TabBar from '../index.vue'

describe('TabBar.vue', () => {
  test('render', () => {
    const wrapper = mount(TabBar, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-tab-bar')
  })
})
