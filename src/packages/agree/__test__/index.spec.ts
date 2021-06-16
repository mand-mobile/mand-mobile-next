import { mount } from '@vue/test-utils'
import Agree from '../index.vue'
import type { Component } from 'vue'

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
    const wrapper: Component = mount(Agree, {
      props: {
        disabled: true,
        modelValue: false,
      },
    })
    expect(wrapper.props('disabled')).toBe(true)
    wrapper.find('.md-agree-icon').trigger('click')
    expect(wrapper.vm.modelValue).toBe(false)
  })

  test('props size should be true', () => {
    const wrapper = mount(Agree, {
      props: {
        size: 'sm',
      },
    })
    expect(wrapper.props('size')).toBe('sm')
  })

  test('change event', async () => {
    const wrapper: Component = mount(Agree, {
      props: {
        modelValue: false,
      },
    })
    await wrapper.find('.md-agree-icon').trigger('click')
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe(
      true
    )
  })

  test('component should be work', () => {
    const wrapper: Component = mount(Agree, {
      props: {
        modelValue: true,
      },
    })
    expect(wrapper.vm.currentIcon).toBe('checked')
  })
})
