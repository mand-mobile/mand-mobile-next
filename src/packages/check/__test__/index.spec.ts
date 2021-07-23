import { mount } from '@vue/test-utils'
import Check from '../index'
import {
  CheckBox as MdCheckBox,
  CheckList as MdCheckList,
  CheckGroup,
} from 'mand-mobile-next/check'
import { nextTick } from 'vue'
import type { Component } from 'vue'

describe('Check.vue', () => {
  test('render', () => {
    const wrapper = mount(Check, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-check')
  })

  test('props modelValue should be work', () => {
    const wrapper = mount(Check, {
      props: {
        modelValue: true,
      },
    })
    expect(wrapper.vm.modelValue).toBe(true)
  })

  test('props size should be work', () => {
    const wrapper = mount(Check, {
      props: {
        size: 'lg',
      },
    })
    expect(wrapper.vm.size).toContain('lg')
  })

  test('props label should be work', () => {
    const wrapper = mount(Check, {
      props: {
        label: 'this is label',
      },
    })
    expect(wrapper.html()).toContain('this is label')
  })

  test('checkbox disabled', () => {
    const clicked = false
    const wrapper = mount(MdCheckBox, {
      props: {
        disabled: true,
      },
    })
    wrapper.find('.md-check-box').trigger('click')
    expect(clicked).toBe(false)
  })

  test('check click event', async () => {
    const wrapper: Component = mount(Check, {
      props: {
        modelValue: false,
      },
    })
    const check = wrapper.find('.md-check')
    await check.trigger('click')
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe(
      true
    )
  })

  test('checkBox click event', async () => {
    const wrapper: Component = mount(MdCheckBox, {
      props: {
        modelValue: false,
      },
    })
    const checkBox = wrapper.find('.md-check-box')
    await checkBox.trigger('click')
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe(
      true
    )
  })

  test('checklist click event', async () => {
    const wrapper = mount(MdCheckList, {
      props: {
        options: [
          { value: 'apple', label: '苹果' },
          { value: 'watermelon', label: '西瓜' },
        ],
        modelValue: ['apple'],
      },
    })
    const items = wrapper.findAll('.md-cell-item')
    expect(items[0].classes('is-checked')).toBe(true)
  })

  test('checkbox group toggleAll', async () => {
    const wrapper = mount(CheckGroup, {
      props: {
        modelValue: ['a'],
      },
      slots: {
        default: [
          '<md-check-box name="a"/>',
          '<md-check-box name="b"/>',
          '<md-check-box name="c" disabled/>',
        ],
      },
    })
    await wrapper.vm.toggleAll()
    expect(wrapper.vm.modelValue).toBeTruthy()
  })

  test('install', () => {
    expect(
      require('vue').createApp(CheckGroup).use(Check)
    ).toBeTruthy()
  })
})
