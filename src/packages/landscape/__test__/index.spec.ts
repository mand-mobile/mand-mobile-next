import { mount } from '@vue/test-utils'
import Landscape from '../index'

describe('Landscape.vue', () => {
  test('render', () => {
    const wrapper = mount(Landscape, {
      props: {
        name: 'scan',
        modelValue: true,
      },
    })
    expect(wrapper.vm.modelValue).toBe(true)
  })

  test('computed currentTransition should be work', () => {
    const wrapper = mount(Landscape, {
      props: {
        transition: '1',
      },
    })
    expect(wrapper.vm.currentTransition).toBe('1')
  })

  test('computed currentTransition should be work', () => {
    const wrapper = mount(Landscape, {
      props: {
        fullScreen: true,
      },
    })
    expect(wrapper.vm.currentTransition).toBe('md-fade')
  })

  test('show and hide event', () => {
    const wrapper = mount(Landscape)
    wrapper.vm.onShow()
    expect(wrapper.emitted('show')).toBeTruthy()

    wrapper.vm.onHide()
    wrapper.vm.hidePage()
    expect(wrapper.emitted('hide')).toBeTruthy()
  })

  test('install', () => {
    expect(
      require('vue').createApp(Landscape).use(Landscape)
    ).toBeTruthy()
  })
})
