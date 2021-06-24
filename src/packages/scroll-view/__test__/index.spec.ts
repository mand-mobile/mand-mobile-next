import { mount } from '@vue/test-utils'
import ScrollView from '../index'

describe('ScrollView.vue', () => {
  test('render', () => {
    const wrapper = mount(ScrollView, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-scroll-view')
  })

  test('install', () => {
    expect(
      require('vue').createApp(ScrollView).use(ScrollView)
    ).toBeTruthy()
  })
})
