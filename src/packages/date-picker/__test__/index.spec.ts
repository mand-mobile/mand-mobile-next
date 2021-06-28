import { mount } from '@vue/test-utils'
import DatePicker from '../index'
import demo from '../demo/demo0.vue'
import demo1 from '../demo/demo1.vue'

describe('DatePicker.vue', () => {
  test('base date picker', () => {
    const wrapper = mount(demo)
    expect(wrapper.classes()).toContain('md-date-picker')
  })

  test('time picker', () => {
    const wrapper = mount(demo1)
    expect(wrapper.classes()).toContain('md-date-picker')
  })

  test('install', () => {
    expect(
      require('vue').createApp(DatePicker).use(DatePicker)
    ).toBeTruthy()
  })
})
