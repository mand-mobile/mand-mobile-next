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

  test('props title should be work', () => {
    const wrapper = mount(CellItem, {
      props: {
        title: 'title',
      },
    })
    expect(wrapper.html()).toContain('md-cell-item-title')
  })

  test('props brief should be work', () => {
    const wrapper = mount(CellItem, {
      props: {
        brief: '666',
      },
    })
    expect(wrapper.html()).toContain('md-cell-item-brief')
  })

  test('props arrow should be work', () => {
    const wrapper = mount(CellItem, {
      props: {
        arrow: true,
      },
    })
    expect(wrapper.html()).toContain('md-cell-item-right')
  })

  test('props disabled should be work', () => {
    const wrapper = mount(CellItem, {
      props: {
        disabled: true,
      },
    })
    expect(wrapper.html()).toContain('is-disabled')
  })

  test('props disabled should be work', () => {
    const wrapper = mount(CellItem, {
      props: {
        noBorder: true,
      },
    })
    expect(wrapper.html()).toContain('no-border')
  })

  test('slot should be work', () => {
    const wrapper = mount(CellItem, {
      props: {
        arrow: true,
      },
      slots: {
        right: '<div>this is slot</div>',
      },
    })
    expect(wrapper.html()).toContain('this is slot')
  })
})
