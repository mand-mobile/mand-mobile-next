import { mount } from '@vue/test-utils'
import DropMenu from '../index.vue'

describe('DropMenu.vue', () => {
  test('render', () => {
    const wrapper = mount(DropMenu, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-drop-menu')
  })
})
