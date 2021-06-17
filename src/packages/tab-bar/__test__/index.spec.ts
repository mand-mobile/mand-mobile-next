import { mount } from '@vue/test-utils'
import TabBar from '../index.vue'
import type { Component } from 'vue'

describe('TabBar.vue', () => {
  test('render', () => {
    const wrapper = mount(TabBar, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-tab-bar')
  })

  test('switch menu by parent', (done) => {
    const wrapper = mount(TabBar, {
      props: {
        items: [
          { name: '1', label: '标题一' },
          { name: '2', label: '标题二' },
          { name: '3', label: '标题三' },
        ],
      },
    })

    wrapper.setProps({ modelValue: '2' })
    setTimeout(() => {
      expect(wrapper.vm.modelValue).toBe('2')
      done()
    }, 0)
  })

  test('switch menu by click', () => {
    const wrapper = mount(TabBar, {
      props: {
        modelValue: '1',
        items: [
          { name: '1', label: '标题一' },
          { name: '2', label: '标题二' },
          { name: '3', label: '标题三' },
        ],
      },
    })
    expect(
      wrapper
        .findAll('.md-tab-bar-item')[0]
        .classes('is-active')
    ).toBe(true)
  })

  test('click disabled menu', (done) => {
    const wrapper = mount(TabBar, {
      props: {
        modelValue: '1',
        items: [
          { name: '1', label: '标题一' },
          { name: '2', label: '标题二' },
          { name: '3', label: '标题三', disabled: true },
        ],
      },
    })
    wrapper.findAll('.md-tab-bar-item')[2].trigger('click')
    setTimeout(() => {
      expect(wrapper.vm.modelValue).toBe('1')
      done()
    }, 0)
  })

  test('event click', () => {
    const wrapper: Component = mount(TabBar, {
      props: {
        modelValue: '1',
        items: [
          { name: '1', label: '标题一' },
          { name: '2', label: '标题二' },
        ],
      },
    })
    wrapper.vm.clickHandle(wrapper.vm.items[0])
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe(
      '1'
    )
  })

  test('computed should be work', () => {
    const wrapper: Component = mount(TabBar, {
      props: {
        modelValue: '1',
        immediate: true,
        items: [
          { name: '1', label: '标题一' },
          { name: '2', label: '标题二' },
        ],
      },
    })
    expect(wrapper.vm.modelIndex).toBe(0)
    expect(wrapper.emitted('change')[0][0]).toBeTruthy()
  })
})
