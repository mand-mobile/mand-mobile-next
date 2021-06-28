import { mount } from '@vue/test-utils'
import Picker from '../index'
import demo from '../demo/demo0.vue'
import demo1 from '../demo/demo1.vue'
import demo2 from '../demo/demo2.vue'
import type Wheel from '@better-scroll/wheel'

describe('Picker.vue', () => {
  test('render', async () => {
    const wrapper = mount(demo)
    const picker = wrapper.findComponent<any>({
      name: 'MdPickerView',
    })
    picker.vm.resetWheel()

    expect(wrapper.classes()).toContain('md-picker')
    wrapper.unmount()
  })

  test('base picker', async () => {
    const wrapper = mount(demo)
    const picker = wrapper.findComponent<any>({
      name: 'MdPickerView',
    })
    picker.vm.resetWheel()

    await Promise.resolve()
    await Promise.resolve() // after the nextTick

    const wheels: (Wheel & { trigger: any })[] =
      picker.vm.getWheelInstance()
    wheels[0].getSelectedIndex = () => 4
    wheels[1].getSelectedIndex = () => 3
    wheels[1].trigger('scrollEnd', { x: 0, y: 40 })
    await Promise.resolve()
    expect(wrapper.vm.pickerValue).toEqual([5, 4])
    wrapper.unmount()
  })

  test('cascade picker', async () => {
    const wrapper = mount(demo1)
    const picker = wrapper.findComponent<any>({
      name: 'MdPickerView',
    })
    expect(picker).toBeTruthy()
    wrapper.unmount()
  })

  test('popup picker', async () => {
    const wrapper = mount(demo2)
    const fieldItem = wrapper.findComponent({
      name: 'MdFieldItem',
    })
    fieldItem.trigger('click')
    await Promise.resolve()
    document
      .querySelector('.md-popup-confirm')
      ?.dispatchEvent(new Event('click'))
    await Promise.resolve()
    const picker = wrapper.findComponent<any>({
      name: 'MdPicker',
    })
    picker.vm.onHide()
    expect(wrapper.vm.pickerText[0]).toBe('2017, 1')
  })

  test('install', () => {
    expect(
      require('vue').createApp(Picker).use(Picker)
    ).toBeTruthy()
  })
})
