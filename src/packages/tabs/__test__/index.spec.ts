import { mount } from '@vue/test-utils'
import Tabs from '../index'

describe('Tabs.vue', () => {
  test('render', () => {
    const wrapper = mount(Tabs, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-tabs')
  })

  test('props immediate should be work', () => {
    const wrapper = mount(Tabs, {
      props: {
        immediate: true,
        defaultIndex: 1,
      },
    })
    wrapper.vm.changeHandler('', 2)
    expect(wrapper.emitted('change')).toBeTruthy()
  })

  test('swiperChangeHandler should be work', () => {
    const wrapper = mount(Tabs, {
      props: {
        name: 'tab',
        label: 'first page',
      },
    })
    wrapper.vm.swiperChangeHandler('', 2)
    expect(wrapper.emitted('change')).toBeTruthy()
  })

  test('install', () => {
    expect(
      require('vue').createApp(Tabs).use(Tabs)
    ).toBeTruthy()
  })
})
