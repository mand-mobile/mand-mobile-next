import { mount } from '@vue/test-utils'
import TabPicker from '../index.vue'

describe('TabPicker.vue', () => {
  test('render', () => {
    const wrapper = mount(TabPicker, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-tab-picker')
  })
})
