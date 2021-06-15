import { mount } from '@vue/test-utils'
import Agree from '../index.vue'

describe('Agree.vue', () => {
  test('render', () => {
    const wrapper = mount(Agree, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-agree')
  })
  test('props disabled should be true', () => {
    const wrapper = mount(Agree, {
      props: {
        disabled: true,
      },
    })
    expect(wrapper.props('disabled')).toBe(true)
  })
  test('props size should be true', () => {
    const wrapper = mount(Agree, {
      props: {
        size: 'sm',
      },
    })
    expect(wrapper.props('size')).toBe('sm')
  })
})
