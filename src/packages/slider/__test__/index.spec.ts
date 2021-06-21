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

  test('dragEndHandler', () => {
    const wrapper = mount(Slider, {
      props: {
        hasTip: true,
        modelValue: [1, 2],
      },
    })
    expect(wrapper.vm.dragEndHandler()).toBeFalsy()
  })

  test('computed realValue should be work', (done) => {
    const wrapper = mount(Slider, {
      props: {
        hasTip: true,
        modelValue: 10,
      },
    })
    wrapper.setProps({ modelValue: 20 })
    wrapper.emitted('update:modelValue')
    setTimeout(() => {
      expect(wrapper.vm.realValue).toBe(20)
      done()
    }, 300)
  })
})
