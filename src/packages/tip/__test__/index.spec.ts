import { mount } from '@vue/test-utils'
import Tip from '../index.vue'

describe('Tip.vue', () => {
  test('render', () => {
    const wrapper = mount(Tip, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-tip')
  })
})
