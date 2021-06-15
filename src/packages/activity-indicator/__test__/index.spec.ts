import { mount } from '@vue/test-utils'
import ActivityIndicator from '../index.vue'

describe('ActivityIndicator.vue', () => {
  test('render-roller', () => {
    const wrapper = mount(ActivityIndicator, {
      props: {
        type: 'roller',
      },
    })
    expect(wrapper.classes()).toContain(
      'md-activity-indicator'
    )
  })
  test('render-roller-success', () => {
    const wrapper = mount(ActivityIndicator, {
      props: {
        type: 'roller-success',
        size: 12,
        width: 20,
      },
    })
    expect(wrapper.classes()).toContain(
      'md-activity-indicator'
    )
  })
  test('render-spinner', () => {
    const wrapper = mount(ActivityIndicator, {
      props: {
        type: 'spinner',
        size: 12,
      },
    })
    expect(wrapper.classes()).toContain(
      'md-activity-indicator'
    )
  })
  test('render-carousel', () => {
    const wrapper = mount(ActivityIndicator, {
      props: {
        type: 'carousel',
        size: 12,
      },
    })
    expect(wrapper.classes()).toContain(
      'md-activity-indicator'
    )
  })
  test('slot-content', () => {
    const wrapper = mount(ActivityIndicator, {
      slots: {
        default: 'Main Content',
      },
    })
    expect(wrapper.html()).toContain('Main Content')
  })
})
