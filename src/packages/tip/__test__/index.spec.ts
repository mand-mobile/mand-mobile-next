import { mount } from '@vue/test-utils'
import { h } from 'vue'
import MdButton from 'mand-mobile-next/button'
import Tip from '../index'

const Wrapped = (props: any) => {
  return h(Tip, props, {
    default: h(MdButton, { class: 'tip-button' }),
  })
}

const _mount = (props: any) =>
  mount(Wrapped, {
    props,
  })

describe('Tip.vue', () => {
  test('render', () => {
    const wrapper = _mount({
      content: 'test content',
      placement: 'left',
      fill: true,
      clickOutsideHide: false,
    })

    expect(wrapper.find('.tip-button').exists()).toBe(true)
  })

  test('triggerShow', async () => {
    const wrapper = _mount({
      content: 'test content',
      placement: 'bottom',
      fill: true,
      clickOutsideHide: false,
      appendToBody: false,
    })
    const button = wrapper.find('.md-button')
    const tip = wrapper.find('.md-tip-content')

    button.trigger('click')
    await Promise.resolve()
    expect(tip.isVisible()).toBe(true)
  })

  test('triggerHide', async () => {
    const wrapper = _mount({
      content: 'test content',
      placement: 'top',
      fill: true,
      clickOutsideHide: false,
      appendToBody: false,
    })
    const button = wrapper.find('.md-button')
    const tip = wrapper.find('.md-tip-content')
    const closeIcon = wrapper.find('.md-icon')

    button.trigger('click')
    await Promise.resolve()
    closeIcon.trigger('click')
    await Promise.resolve()
    expect(tip.isVisible()).toBe(false)
  })

  test('triggerClickoutside', async () => {
    const map: any = {}
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb
    })

    const wrapper = _mount({
      content: 'test content',
      placement: 'right',
      fill: true,
      clickOutsideHide: true, // It's will trigger `Maximum recursive updates exceeded`
      closable: false,
      icon: 'info',
    })
    const button = wrapper.find('.md-button')
    const tip = document.body.querySelector(
      '.md-tip-content'
    ) as any

    button.trigger('click')
    await Promise.resolve()
    map.click({ target: document.body })
    await Promise.resolve()
    expect(tip.style.display).toBe('none')
  })

  test('install', () => {
    expect(
      require('vue').createApp(Tip).use(Tip)
    ).toBeTruthy()
  })
})
