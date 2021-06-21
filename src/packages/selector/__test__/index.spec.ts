import { mount } from '@vue/test-utils'
import Selector from '../index.vue'

describe('Selector.vue', () => {
  test('props visible should be work', () => {
    const wrapper = mount(Selector, {
      props: {
        visible: true,
      },
    })
    expect(wrapper.vm.popupShow).toBe(true)
  })

  test('show/hide event', () => {
    const wrapper = mount(Selector, {
      props: {
        visible: false,
        modelValue: [1, 2],
      },
    })
    wrapper.vm.directHide()
    expect(wrapper.vm.isConfirm).toBeFalsy()

    wrapper.vm.onShow()
    expect(wrapper.emitted('show')).toBeTruthy()

    wrapper.vm.onHide()
    wrapper.vm.innerValue = [1, 2]
    expect(wrapper.emitted('hide')).toBeTruthy()
  })

  test('confirm handler event', (done) => {
    const wrapper = mount(Selector, {
      props: {
        okText: 'ok',
        modelValue: '1',
      },
    })
    wrapper.vm.cancelHandler()
    wrapper.vm.confirmHandler()
    expect(wrapper.emitted('confirm')).toBeTruthy()

    wrapper.setProps({ modelValue: [1, 2] })

    setTimeout(() => {
      wrapper.vm.confirmHandler()
      done()
    }, 300)
  })

  test('computed innerValue should be work', (done) => {
    const wrapper = mount(Selector, {
      props: {
        modelValue: '1',
        data: [
          {
            value: '1',
            text: '选项一',
          },
          {
            value: '2',
            text: '选项二',
          },
          {
            value: '3',
            text: '选项三',
          },
        ],
      },
    })
    wrapper.vm.innerValue = '2'
    setTimeout(() => {
      wrapper.vm.confirmHandler()
      done()
    }, 300)
  })
})
