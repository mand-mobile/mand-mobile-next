import { mount } from '@vue/test-utils'
import Landscape from '../index.vue'

describe('Landscape.vue', () => {
  test('render', () => {
    const wrapper = mount(Landscape, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-landscape')
  })
})
