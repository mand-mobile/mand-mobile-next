import { mount } from '@vue/test-utils'
import TabPicker from '../index'
import demo from '../demo/demo0.vue'

const wrapper = mount(demo)

describe('TabPicker.vue', () => {
  test('render', async () => {
    const fieldItem = wrapper.findComponent({
      name: 'MdFieldItem',
    })

    fieldItem.trigger('click')
    expect(wrapper.vm.show).toBe(true)
  })

  test('select', async () => {
    const tabPickerOne = document.body.querySelector(
      '.md-cell-item'
    ) as any
    tabPickerOne.__vnode.props.onClick()
    await Promise.resolve()
    const tabPickerTwo = document.body
      .querySelector('.md-tab-pane:nth-child(2)')
      ?.querySelector('.md-cell-item') as any
    tabPickerTwo.__vnode.props.onClick()
    expect(wrapper.vm.show).toEqual(false)
    expect(wrapper.vm.selects).toEqual(['pk', 'hd'])
  })

  test('install', () => {
    expect(
      require('vue').createApp(TabPicker).use(TabPicker)
    ).toBeTruthy()
  })
})
