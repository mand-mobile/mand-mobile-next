import { mount } from '@vue/test-utils'
import Radio from '../index.vue'

describe('Radio.vue', () => {
  test('render', () => {
    const wrapper = mount(Radio, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-radio')
  })
})
