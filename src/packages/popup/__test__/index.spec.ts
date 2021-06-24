import { mount } from '@vue/test-utils'
import Popup from '../index'

describe('NoticeBar.vue', () => {
  test('popup show/hide', (done) => {
    const wrapper = mount(Popup, {
      props: {
        modelValue: true,
        hasMask: true,
        position: 'right',
      },
    })
    wrapper.setProps({ value: true })
    wrapper.vm.beforePopupAppear()
    wrapper.vm.popupAppear()
    setTimeout(() => {
      expect(wrapper.emitted('show')).toBeTruthy()
      expect(wrapper.emitted('beforeShow')).toBeTruthy()
      done()
    }, 50)

    wrapper.vm.beforePopupLeave()
    wrapper.vm.popupLeave()
    setTimeout(() => {
      expect(wrapper.emitted('beforeHide')).toBeTruthy()
      expect(wrapper.emitted('hide')).toBeTruthy()
      done()
    }, 50)
  })

  test('popupMaskClick', () => {
    const wrapper = mount(Popup, {
      props: {
        modelValue: true,
        hasMask: true,
        maskClosable: true,
        position: 'left',
      },
    })
    wrapper.vm.popupMaskClick()
    expect(wrapper.emitted('maskClick')).toBeTruthy()
    expect(wrapper.vm.currentTransition).toBe(
      'md-slide-right'
    )
  })

  test('install', () => {
    expect(
      require('vue').createApp(Popup).use(Popup)
    ).toBeTruthy()
  })
})
