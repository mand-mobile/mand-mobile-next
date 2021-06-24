import { mount } from '@vue/test-utils'
import Swiper from '../index'

describe('Swiper.vue', () => {
  test('render', () => {
    const wrapper = mount(Swiper, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-swiper')
  })

  test('install', () => {
    expect(
      require('vue').createApp(Swiper).use(Swiper)
    ).toBeTruthy()
  })
})
