import { mount } from '@vue/test-utils'
import NumberKeyboard from '../index'
import demo from '../demo/demo0.vue'

describe('NumberKeyboard.vue', () => {
  test('render', () => {
    const wrapper = mount(NumberKeyboard, {
      props: {
        isView: true,
        disorder: true,
      },
    })
    expect(wrapper.classes()).toContain(
      'md-number-keyboard-container'
    )
    wrapper.unmount()
  })

  test('popup keyboard', async () => {
    const wrapper = mount(demo)
    const button = wrapper.findComponent({
      name: 'MdButton',
    })
    const keyboard = wrapper.findComponent<any>({
      name: 'MdNumberKeyboard',
    })
    button.trigger('click')
    await Promise.resolve()
    expect(keyboard.vm.popupShow).toBe(true)

    const keyone = document.body.querySelector(
      '.keyboard-key-item'
    )

    for (const i of [4, 3, 2, 1]) {
      keyone?.dispatchEvent(new Event('touchstart'))
      keyone?.dispatchEvent(new Event('touchend'))
      await Promise.resolve()
    }

    document
      .querySelector('.confirm')
      ?.dispatchEvent(new Event('touchstart'))
    document
      .querySelector('.confirm')
      ?.dispatchEvent(new Event('touchend'))
    await Promise.resolve()
    expect(keyboard.vm.popupShow).toBe(false)

    button.trigger('click')
    await Promise.resolve()
    expect(keyboard.vm.popupShow).toBe(true)
    document
      .querySelector('.slidedown')
      ?.dispatchEvent(new Event('touchstart'))
    document
      .querySelector('.slidedown')
      ?.dispatchEvent(new Event('touchend'))
    await Promise.resolve()
    expect(keyboard.vm.popupShow).toBe(false)
    wrapper.unmount()
  })

  test('install', () => {
    expect(
      require('vue')
        .createApp(NumberKeyboard)
        .use(NumberKeyboard)
    ).toBeTruthy()
  })
})
