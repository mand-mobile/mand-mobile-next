import { mount } from '@vue/test-utils'
import DatePicker from '../index.vue'

describe('DatePicker.vue', () => {
  test('render', () => {
    const wrapper = mount(DatePicker, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-date-picker')
  })
})
