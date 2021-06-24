import { mount } from '@vue/test-utils'
import Picker from '../index'

describe('Picker.vue', () => {
  test('render', () => {
    const wrapper = mount(Picker, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-picker')
  })

  test('install', () => {
    expect(
      require('vue').createApp(Picker).use(Picker)
    ).toBeTruthy()
  })
})
