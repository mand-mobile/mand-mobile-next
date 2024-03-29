import { mount } from '@vue/test-utils'
import Captcha from '../index'
import demo from '../demo/demo0.vue'

describe('Captcha.vue', () => {
  test('captcha input', async () => {
    const wrapper = mount(demo, {
      props: {},
    })
    const button = wrapper.find('.md-button')
    const captcha = wrapper.findComponent<any>({
      name: 'MdCaptcha',
    })
    button.trigger('click')
    await Promise.resolve()
    const keyone = document.body.querySelector(
      '.keyboard-key-item'
    )

    for (const i of [4, 3, 2, 1]) {
      keyone?.dispatchEvent(new Event('touchstart'))
      keyone?.dispatchEvent(new Event('touchend'))
      await Promise.resolve()
    }

    expect(captcha.vm.code === '1111').toBe(true)
  })

  test('inlineview render', () => {
    const wrapper = mount(Captcha, {
      props: {
        isView: true,
        count: 0,
      },
    })
    expect(wrapper.classes()).toContain('md-captcha')
  })

  test('popup render', () => {
    const wrapper = mount(demo, {
      props: {},
    })
    const content = document.body.querySelector(
      '.md-captcha-content'
    )
    expect(content).toBeTruthy()
  })

  test('captcha show', async () => {
    const wrapper = mount(demo, {
      props: {},
    })
    const button = wrapper.find('.md-button')
    const captcha = wrapper.findComponent<any>({
      name: 'MdCaptcha',
    })
    button.trigger('click')
    await Promise.resolve()
    expect(captcha.vm.popupShow).toBe(true)
  })

  test('captcha hide', async () => {
    const wrapper = mount(demo, {
      props: {},
    })
    const button = wrapper.find('.md-button')
    const captcha = wrapper.findComponent<any>({
      name: 'MdCaptcha',
    })
    button.trigger('click')
    captcha.vm.onShow()
    await Promise.resolve()
    captcha.vm.onHide()
    await Promise.resolve()
    expect(captcha.vm.popupShow).toBe(false)
  })

  test('captcha setError', async () => {
    const wrapper = mount(demo, {
      props: {},
    })
    const button = wrapper.find('.md-button')
    const captcha = wrapper.findComponent<any>({
      name: 'MdCaptcha',
    })
    button.trigger('click')
    captcha.vm.setError('错误')
    await Promise.resolve()
    await Promise.resolve()
    expect(captcha.vm.errorMsg).toBe('错误')
  })

  test('captcha countdown', async () => {
    jest.useFakeTimers()

    const wrapper = mount(demo, {
      props: {},
    })
    const button = wrapper.find('.md-button')
    const captcha = wrapper.findComponent<any>({
      name: 'MdCaptcha',
    })
    button.trigger('click')
    await Promise.resolve()
    jest.advanceTimersByTime(60000)
    expect(captcha.vm.countBtnText).toBe('发送验证码')
  })

  test('install', () => {
    expect(
      require('vue').createApp(Captcha).use(Captcha)
    ).toBeTruthy()
  })
})
