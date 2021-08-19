import { mount } from '@vue/test-utils'
import NoticeBar from '../index'

describe('NoticeBar.vue', () => {
  test('render', () => {
    const wrapper = mount(NoticeBar, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-notice-bar')
  })

  test('props-multi', () => {
    const wrapper = mount(NoticeBar, {
      props: {
        multiRows: true,
      },
    })
    expect(wrapper.html()).toContain(
      'md-notice-bar-multi-content'
    )
  })

  test('props-round', () => {
    const wrapper = mount(NoticeBar, {
      props: {
        round: true,
        type: 'activity',
      },
    })
    expect(wrapper.html()).toContain('md-notice-bar-round')
  })

  test('render-slot', () => {
    const wrapper = mount(NoticeBar, {
      slots: {
        left: 'this is a slot',
      },
    })
    const left = wrapper.find('.md-notice-bar-left')
    expect(left.text()).toBe('this is a slot')
  })

  test('computed', (done) => {
    const wrapper = mount(NoticeBar, {
      props: {
        mode: 'link',
        time: 300,
        scrollable: true,
      },
    })
    expect(wrapper.vm.rightIcon).toBe('arrow-right')

    setTimeout(() => {
      expect(wrapper.vm.isShow).toBe(false)
      done()
    }, 300)
  })

  test('install', () => {
    expect(
      require('vue').createApp(NoticeBar).use(NoticeBar)
    ).toBeTruthy()
  })
})
