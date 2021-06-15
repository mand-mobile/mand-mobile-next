import { mount } from '@vue/test-utils'
import CellItem from '../index.vue'

describe('CellItem.vue', () => {
  test('render', () => {
    const wrapper = mount(CellItem, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-cell-item')
  })
})
