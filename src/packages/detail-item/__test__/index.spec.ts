import { mount } from '@vue/test-utils'
import DetailItem from '../index.vue'

describe('DetailItem.vue', () => {
  test('render', () => {
    const wrapper = mount(DetailItem, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-detail-item')
  })
})
