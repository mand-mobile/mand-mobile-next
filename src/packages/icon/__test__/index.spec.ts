import { mount } from '@vue/test-utils'
import Icon from '../index'

describe('Icon.vue', () => {
  test('render', () => {
    const wrapper = mount(Icon, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-icon')
  })
  test('render-type', () => {
    const wrapper = mount(Icon, {
      props: {
        name: 'wrong',
        svg: true,
        size: '20',
      },
    })
    expect(wrapper.props('svg')).toBe(true)
    expect(wrapper.props('size')).toEqual('20')
  })
  test('props-val', () => {
    const wrapper = mount(Icon, {
      props: {
        size: '20',
      },
    })
    expect(wrapper.props('size')).toEqual('20')
  })
  test('class-name', () => {
    const wrapper = mount(Icon, {
      props: {
        name: 'close',
      },
    })
    expect(wrapper.html()).toContain('md-icon-close')
  })

  test('install', () => {
    expect(
      require('vue').createApp(Icon).use(Icon)
    ).toBeTruthy()
  })
})
