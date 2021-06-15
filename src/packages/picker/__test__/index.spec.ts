import { mount } from '@vue/test-utils'
import Picker from '../index.vue'

describe('Picker.vue', () => {
  test('render', () => {
    const wrapper = mount(Picker, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-picker')
  })
})
