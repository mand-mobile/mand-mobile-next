import { mount } from '@vue/test-utils'
import Check from '../index.vue'

describe('Check.vue', () => {
  test('render', () => {
    const wrapper = mount(Check, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-check')
  })
})
