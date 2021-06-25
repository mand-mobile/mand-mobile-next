import { mount } from '@vue/test-utils'
import Slider from '../index'
import demo from '../demo/demo0.vue'
import demo2 from '../demo/demo2.vue'

const originGetBoundingClientRect =
  HTMLDivElement.prototype.getBoundingClientRect

beforeAll(() => {
  HTMLDivElement.prototype.getBoundingClientRect = () =>
    ({
      height: 50,
      width: 750,
      x: 0,
      y: 0,
    } as any)
})

afterAll(() => {
  HTMLDivElement.prototype.getBoundingClientRect =
    originGetBoundingClientRect
})

describe('Slider.vue', () => {
  test('render', () => {
    const wrapper = mount(Slider, {
      props: {},
    })
    expect(wrapper.classes()).toContain('md-slider')
  })

  test('slide', async () => {
    const wrapper = mount(demo)
    const dragger = wrapper.find('span')

    dragger.trigger('touchstart')

    const touchstart = new TouchEvent('touchstart', {
      touches: [{ pageX: 0, pageY: 0 }] as any,
    })
    window.dispatchEvent(touchstart)

    const touchmove = new TouchEvent('touchmove', {
      touches: [{ pageX: 375, pageY: 0 }] as any,
    })
    window.dispatchEvent(touchmove)

    await Promise.resolve()

    window.dispatchEvent(new Event('touchend'))
    dragger.trigger('touchend')

    expect(wrapper.vm.step).toBe(50)
  })

  test('range slide', async () => {
    const wrapper = mount(demo2)
    const dragger = wrapper.find('span')

    dragger.trigger('touchstart')

    const touchstart = new TouchEvent('touchstart', {
      touches: [{ pageX: 0, pageY: 0 }] as any,
    })
    window.dispatchEvent(touchstart)

    const touchmove = new TouchEvent('touchmove', {
      touches: [{ pageX: 375, pageY: 0 }] as any,
    })
    window.dispatchEvent(touchmove)

    await Promise.resolve()

    window.dispatchEvent(new Event('touchend'))
    dragger.trigger('touchend')

    expect(wrapper.vm.range).toEqual([50, 55])
    wrapper.unmount()
  })

  test('install', () => {
    expect(
      require('vue').createApp(Slider).use(Slider)
    ).toBeTruthy()
  })
})
