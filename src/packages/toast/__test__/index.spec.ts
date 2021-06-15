import { mount } from '@vue/test-utils'
import Toast from '../index.vue'

describe('Toast.vue', () => {
  test('render', () => {
    const wrapper = mount(Toast, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-toast')
  })
})
