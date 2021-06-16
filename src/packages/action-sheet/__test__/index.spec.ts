import { mount } from '@vue/test-utils'
import ActionSheet from '../index.vue'
import type { Component } from 'vue'

describe('ActionSheet.vue', () => {
  const props = {
    title: '操作说明的标题',
    options: [
      {
        label: '选项1',
        value: 0,
      },
      {
        label: '选项2',
        value: 1,
      },
      {
        label: '选项3',
        value: 2,
      },
    ],
    defaultIndex: 1,
    cancelText: '取消',
    modelValue: 2,
  }

  test('render', () => {
    const wrapper = mount(ActionSheet, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-action-sheet')
  })

  test('empty options', () => {
    const wrapper = mount(ActionSheet, {
      props: {
        title: '操作说明的标题',
        visible: true,
      },
    })
    expect(
      wrapper.findAll('.md-action-sheet-item').length
    ).toBe(0)
  })

  test('computed feature should be work', () => {
    const wrapper = mount(ActionSheet, {
      props,
    })
    expect(wrapper.vm.currentIndex).toBe(2)
  })

  test('show/hide/selected events', () => {
    const wrapper: Component = mount(ActionSheet, {
      props,
    })
    wrapper.vm.onShow()
    wrapper.vm.cancelHandler()
    wrapper.vm.onHide()
    wrapper.vm.onSelect(props.options[2])
    expect(wrapper.emitted('show')[0][0]).toBeFalsy()
    expect(wrapper.emitted('cancel')[0][0]).toBeFalsy()
    expect(wrapper.emitted('hide')[0][0]).toBeFalsy()
    expect(
      wrapper.emitted('update:visible')[0][0]
    ).toBeFalsy()
    expect(wrapper.vm.visible).toBe(false)
  })
})
