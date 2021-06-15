import { mount } from '@vue/test-utils'
import Tag from '../index.vue'

describe('Tag.vue', () => {
  test('render', () => {
    const wrapper = mount(Tag, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-tag')
  })

  test('props size is small', () => {
    const wrapper = mount(Tag, {
      props: {
        name: 'scan',
        size: 'small',
        shape: 'circle',
        type: 'fill',
        fillColor: '#FC7353',
        fontColor: '#fff',
      },
    })
    expect(wrapper.html()).toContain('small')
    expect(wrapper.props('type')).toBe('fill')
  })

  test('props fillColor is #FC7353', () => {
    const wrapper = mount(Tag, {
      props: {
        name: 'scan',
        size: 'small',
        shape: 'circle',
        type: 'fill',
        fillColor: '#FC7353',
        fontColor: '#fff',
      },
    })
    expect(wrapper.html()).toContain('rgb(252, 115, 83)')
  })

  test('props fontColor is white', () => {
    const wrapper = mount(Tag, {
      props: {
        name: 'scan',
        size: 'small',
        shape: 'circle',
        type: 'fill',
        fillColor: '#FC7353',
        fontColor: '#fff',
      },
    })
    expect(wrapper.html()).toContain('rgb(255, 255, 255)')
  })

  test('props shape is square', () => {
    const wrapper = mount(Tag, {
      props: {
        name: 'scan',
        size: 'small',
        shape: 'square',
        type: 'fill',
        fillColor: '#FC7353',
        fontColor: '#fff',
      },
    })
    expect(wrapper.props('shape')).toBe('square')
  })

  test('props-size is large', () => {
    const wrapper = mount(Tag, {
      props: {
        name: 'scan',
        size: 'large',
        shape: 'square',
        type: 'fill',
        fillColor: '#FC7353',
        fontColor: '#fff',
      },
    })
    expect(wrapper.props('size')).toBe('large')
  })

  test('props shape is bubble', () => {
    const wrapper = mount(Tag, {
      props: {
        name: 'scan',
        size: 'large',
        shape: 'bubble',
        type: 'fill',
        fillColor: '#FC7353',
        fontColor: '#fff',
      },
    })
    expect(wrapper.props('shape')).toBe('bubble')
  })
})
