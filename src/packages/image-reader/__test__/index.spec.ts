import { mount } from '@vue/test-utils'
import ImageReader from '../index.vue'

describe('ImageReader.vue', () => {
  test('render', () => {
    const wrapper = mount(ImageReader, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-image-reader')
  })
})
