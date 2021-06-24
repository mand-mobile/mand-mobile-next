import { mount } from '@vue/test-utils'
import DetailItem from '../index'

describe('DetailItem.vue', () => {
  test('render', () => {
    const wrapper = mount(DetailItem, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-detail-item')
  })

  test('props title should be work', () => {
    const wrapper = mount(DetailItem, {
      props: {
        title: 'this is title',
      },
    })
    expect(wrapper.text()).toContain('this is title')
  })

  test('props content should be work', () => {
    const wrapper = mount(DetailItem, {
      props: {
        title: 'this is content',
      },
    })
    expect(wrapper.text()).toContain('this is content')
  })

  test('install', () => {
    expect(
      require('vue').createApp(DetailItem).use(DetailItem)
    ).toBeTruthy()
  })
})
