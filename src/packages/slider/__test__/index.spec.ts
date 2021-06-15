import { mount } from '@vue/test-utils'
import Slider from '../index.vue'

describe('Slider.vue', () => {
  test('render', () => {
    const wrapper = mount(Slider, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-slider')
  })
})
