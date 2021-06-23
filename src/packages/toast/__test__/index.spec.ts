import { mount } from '@vue/test-utils'
import Toast from '../index'

describe('Toast.vue', () => {
  test('render', () => {
    const wrapper = mount(Toast, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-toast')
  })

  test('show/hide event should be work', async () => {
    const wrapper = mount(Toast, {
      props: {
        content: 'this is content',
        duration: 300,
      },
    })
    await wrapper.vm.show()
    wrapper.vm.onShow()
    expect(wrapper.vm.isPopupShow).toBe(true)
    expect(wrapper.text()).toContain('this is content')
    await wrapper.vm.hide()
    wrapper.vm.onHide()
    expect(wrapper.vm.isPopupShow).toBe(false)
  })

  test('props ', () => {
    const wrapper = mount(Toast, {
      props: {
        content: 'this is content',
      },
    })
    expect(wrapper.text()).toContain('this is content')
  })

  test('api call', async () => {
    Toast.info('message')
    Toast.failed('failed')
    Toast.loading('loading')
    Toast.succeed('success')
    expect(Toast._instance).toBeTruthy()
    Toast.hide()
    expect(Toast._instance).toBeTruthy()
    Toast.hide(true)
    expect(Toast._instance).toBe(null)
  })
})
