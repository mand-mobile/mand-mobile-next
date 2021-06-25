import { mount } from '@vue/test-utils'
import ScrollView from '../index'
import demo from '../demo/demo0.vue'

jest.useFakeTimers()
const sleep = (time = 1500) =>
  new Promise((resolve, _) => {
    setTimeout(() => resolve(false), time)
  })

describe('ScrollView.vue', () => {
  test('render', () => {
    const wrapper = mount(ScrollView, {
      props: {
        pullDown: true,
        pullUp: true,
      },
    })
    expect(wrapper.classes()).toContain('md-scroll-view')
  })

  test('pulling', async () => {
    const wrapper = mount(demo)
    const scroller = wrapper.findComponent({
      ref: 'scroller',
    }) as any
    const bs = scroller.vm.getScrollerInstance()

    bs.trigger('scroll', {
      y: 100,
      x: 0,
    })

    bs.trigger('pullingDown')

    jest.advanceTimersByTime(6000)
    await Promise.resolve()

    expect(wrapper.vm.list).toBe(15)

    bs.trigger('scroll', {
      y: -1000,
      x: 0,
    })
    bs.trigger('pullingUp')

    jest.advanceTimersByTime(6000)
    await Promise.resolve()
    scroller.vm.resetScroller()
    expect(wrapper.vm.list).toBe(20)
  })

  test('install', () => {
    expect(
      require('vue').createApp(ScrollView).use(ScrollView)
    ).toBeTruthy()
  })
})
