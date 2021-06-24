import { mount } from '@vue/test-utils'
import InputItem from '../index'

describe('InputItem.vue', () => {
  test('render', () => {
    const wrapper = mount(InputItem, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-input-item')
  })

  test('install', () => {
    expect(
      require('vue').createApp(InputItem).use(InputItem)
    ).toBeTruthy()
  })
})
