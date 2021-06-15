import { mount } from '@vue/test-utils'
import ScrollView from '../index.vue'

describe('ScrollView.vue', () => {
  test('render', () => {
    const wrapper = mount(ScrollView, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-scroll-view')
  })
})
