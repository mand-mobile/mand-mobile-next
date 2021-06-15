import { mount } from '@vue/test-utils'
import Progress from '../index.vue'

describe('Progress.vue', () => {
  test('render', () => {
    const wrapper = mount(Progress, {
      props: {
        width: 100,
      },
    })
    expect(wrapper.classes()).toContain('md-progress')
  })

  test('props-value', () => {
    const wrapper = mount(Progress, {
      props: {
        size: 100,
        value: 0.2,
        width: 5,
      },
    })
    expect(wrapper.props().value).toBe(0.2)
  })
  test('props-bordercolor', () => {
    const wrapper = mount(Progress, {
      props: {
        size: 100,
        value: 0.2,
        width: 5,
        borderColor: 'red',
      },
    })
    expect(wrapper.props().borderColor).toBe('red')
  })
  test('props-transition', () => {
    const wrapper = mount(Progress, {
      props: {
        size: 100,
        value: 0.2,
        width: 5,
        transition: false,
      },
    })
    expect(wrapper.props().transition).toBe(false)
  })

  test('slot-content', () => {
    const wrapper = mount(Progress, {
      slots: {
        default: '<span class="progress-value">100%</span>',
      },
    })
    expect(wrapper.html()).toContain('100%')
  })
})
