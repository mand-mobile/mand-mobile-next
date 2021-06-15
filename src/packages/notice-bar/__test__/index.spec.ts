import { mount } from '@vue/test-utils'
import NoticeBar from '../index.vue'

describe('NoticeBar.vue', () => {
  test('render', () => {
    const wrapper = mount(NoticeBar, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-notice-bar')
  })

  test('props-close', () => {
    const wrapper = mount(NoticeBar, {
      props: {
        closable: true,
      },
    })
    expect(wrapper.props('closable')).toBe(true)
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

  test('close-click', () => {
    const wrapper = mount(NoticeBar, {
      props: {
        closable: true,
      },
    })
    wrapper.find('.md-notice-icon-right').trigger('click')
    expect(wrapper.emitted())
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

  test('computed', () => {
    const wrapper = mount(NoticeBar, {
      props: {
        mode: 'link',
      },
    })
    expect(wrapper.vm.rightIcon).toBe('arrow-right')
  })
})
