import { mount } from '@vue/test-utils'
import Tip from '../index.vue'

describe('Tip.vue', () => {
  test('render', () => {
    const wrapper = mount(Tip, {
      props: {
        name: 'scan',
        placement: 'left',
        fill: true,
      },
    })
    expect(wrapper.classes()).toContain('md-tip')
  })

  test('triggerHandler should be work', () => {
    const wrapper = mount(Tip, {
      props: {
        placement: 'bottom',
        fill: true,
      },
    })
    expect(wrapper.vm.triggerHandler(false)).toBeTruthy()
    expect(wrapper.vm.contentPosition).toBeTruthy()
  })

  test('props placement should be work', () => {
    const wrapper = mount(Tip, {
      props: {
        placement: 'top',
        fill: true,
      },
    })
    wrapper.setProps({ placement: 'left' })
    setTimeout(() => {
      expect(wrapper.vm.contentPosition).toBeTruthy()
    }, 300)
  })

  test('props placement should be work', () => {
    const wrapper = mount(Tip, {
      props: {
        placement: 'right',
        fill: true,
      },
    })
    expect(wrapper.vm.triggerHandler(true)).toBeTruthy()
    expect(wrapper.vm.contentPosition).toBeTruthy()
  })
})
