import { mount } from '@vue/test-utils'
import { triggerEvent } from 'mand-mobile-next/utils/trigger-event'
import InputItem from '../index'
import demo0 from '../demo/demo0.vue'

describe('InputItem.vue', () => {
  test('render', () => {
    const wrapper = mount(InputItem, {
      props: {},
    })
    expect(wrapper.classes()).toContain('md-input-item')
    wrapper.unmount()
  })

  test('input', () => {
    const wrapper = mount(InputItem)
    const input = wrapper.find('.md-input-item-input')

    triggerEvent(input.element, 'keydown', 0, 0, 49)
    triggerEvent(input.element, 'keyup', 0, 0, 49)
    triggerEvent(input.element, 'keydown', 0, 0, 11)
    triggerEvent(input.element, 'keyup', 0, 0, 11)

    triggerEvent(input.element, 'keydown', 0, 0, 13)
    triggerEvent(input.element, 'keyup', 0, 0, 13)
    triggerEvent(input.element, 'focus', 0, 0, '')
    triggerEvent(input.element, 'input', 0, 0, '123')
    triggerEvent(input.element, 'blur', 0, 0)

    expect(wrapper.vm.innerValue).toBe('494911111313123')
    wrapper.unmount()
  })

  test('bankCard type', () => {
    const wrapper = mount(InputItem, {
      props: {
        type: 'bankCard',
        modelValue: '494911111313123',
      },
    })

    expect(wrapper.vm.innerValue).toBe('4949 1111 1313 123')
    wrapper.unmount()
  })

  test('phone type', () => {
    const wrapper = mount(InputItem, {
      props: {
        type: 'phone',
        modelValue: '13051348898',
      },
    })

    expect(wrapper.vm.innerValue).toBe('130 5134 8898')
    wrapper.unmount()
  })

  test('digit type', () => {
    const wrapper = mount(InputItem, {
      props: {
        type: 'digit',
        modelValue: 'zh110',
      },
    })

    expect(wrapper.vm.innerValue).toBe('110')
    wrapper.unmount()
  })

  test('money type', () => {
    const wrapper = mount(InputItem, {
      props: {
        type: 'money',
        modelValue: '1000',
      },
    })

    expect(wrapper.vm.innerValue).toBe('1,000')
    wrapper.unmount()
  })

  test('virtualKeyboard input', async () => {
    const wrapper = mount(InputItem, {
      props: {
        type: 'money',
        modelValue: '1000',
        isVirtualKeyboard: true,
      },
    })
    const fakeInput = wrapper.find('.md-fake-input')

    triggerEvent(fakeInput.element, 'click', 0, 0)
    triggerEvent(document.body, 'click', 0, 0)

    const keyone = document.body.querySelector(
      '.keyboard-key-item'
    )
    for (const i of [4, 3, 2, 1]) {
      keyone?.dispatchEvent(new Event('touchstart'))
      keyone?.dispatchEvent(new Event('touchend'))
      await Promise.resolve()
    }

    expect(wrapper.vm.innerValue).toBe('10001111')
    wrapper.unmount()
  })

  test('install', () => {
    expect(
      require('vue').createApp(InputItem).use(InputItem)
    ).toBeTruthy()
  })
})
