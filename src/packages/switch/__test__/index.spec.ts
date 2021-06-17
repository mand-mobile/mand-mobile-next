import { mount } from '@vue/test-utils'
import Switch from '../index.vue'
import type { Component } from 'vue'

describe('Switch.vue', () => {
  test('render', () => {
    const wrapper = mount(Switch, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-switch')
  })

  test('props modelValue should be work', () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: true,
      },
    })
    expect(wrapper.html()).toContain('active')
  })

  test('props disabled should be work', () => {
    const wrapper = mount(Switch, {
      props: {
        disabled: true,
      },
    })
    expect(wrapper.html()).toContain('disabled')
  })

  test('onchange event', () => {
    const wrapper: Component = mount(Switch)
    wrapper.vm.onChange()
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe(
      true
    )
  })
})
