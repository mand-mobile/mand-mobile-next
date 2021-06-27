import { mount } from '@vue/test-utils'
import Swiper from '../index'
import demo from '../demo/demo0.vue'
import demo2 from '../demo/demo2.vue'

jest.useFakeTimers()

function mockDomRect(wrapper: any, container: any) {
  jest
    .spyOn(wrapper, 'clientWidth', 'get')
    .mockImplementation(() => 750)
  jest
    .spyOn(wrapper, 'clientHeight', 'get')
    .mockImplementation(() => 300)

  Object.defineProperties(container, {
    offsetHeight: {
      get: () => 300,
    },
    offsetWidth: {
      get: () => 2250,
    },
  })
}

describe('Swiper.vue', () => {
  test('render', () => {
    const wrapper = mount(demo, {
      props: {},
    })
    const wrapperElement = wrapper.find(
      '.md-swiper-box'
    ).element
    const containerElement = wrapper.find(
      '.md-swiper-container'
    ).element

    mockDomRect(wrapperElement, containerElement)

    const swiper = wrapper.findComponent<any>({
      name: 'MdSwiper',
    })

    swiper.vm.renderSwiper()
    expect(wrapper.classes()).toContain('md-swiper')
  })

  test('horizontal swiper', async () => {
    const wrapper = mount(demo)

    const wrapperElement = wrapper.find(
      '.md-swiper-box'
    ).element
    const containerElement = wrapper.find(
      '.md-swiper-container'
    ).element

    mockDomRect(wrapperElement, containerElement)

    const swiper = wrapper.findComponent<any>({
      name: 'MdSwiper',
    })

    swiper.vm.renderSwiper()
    swiper.vm
      .getSwiperInstance()
      .trigger('slidePageChanged', {
        pageX: 2,
        pageY: 0,
      })

    expect(swiper.vm.currentIndex).toBe(2)

    swiper.vm.resetSwiper()
    swiper.vm
      .getSwiperInstance()
      .trigger('slideWillChange', {
        pageX: 2,
        pageY: 0,
      })
    expect(swiper.vm.currentIndex).toBe(2)
    wrapper.unmount()
  })

  test('fade swiper', async () => {
    const wrapper = mount(demo2, {
      props: {},
    })
    const wrapperElement = wrapper.find(
      '.md-swiper-box'
    ).element

    HTMLDivElement.prototype.getBoundingClientRect = () =>
      ({
        height: 50,
        width: 750,
        x: 0,
        y: 0,
      } as any)

    const touchstart = new TouchEvent('touchstart', {
      touches: [{ pageX: 100, pageY: 10 }] as any,
    })
    wrapperElement.dispatchEvent(touchstart)

    const touchmove = new TouchEvent('touchmove', {
      touches: [{ pageX: 10, pageY: 10 }] as any,
    })
    wrapperElement.dispatchEvent(touchmove)

    wrapperElement.dispatchEvent(new Event('touchend'))

    const swiper = wrapper.findComponent<any>({
      name: 'MdSwiper',
    })

    const containerChildren = wrapper.find(
      '.md-swiper-container'
    ).element.children

    await Promise.resolve()

    Array.from(containerChildren).forEach((child: any) => {
      child?.ontransitionstart?.()
      child?.ontransitionend?.()
    })

    expect(swiper.vm.currentIndex).toBe(1)
    jest.advanceTimersByTime(3500)
    expect(swiper.vm.currentIndex).toBe(2)
    wrapper.unmount()
  })

  test('install', () => {
    expect(
      require('vue').createApp(Swiper).use(Swiper)
    ).toBeTruthy()
  })
})
