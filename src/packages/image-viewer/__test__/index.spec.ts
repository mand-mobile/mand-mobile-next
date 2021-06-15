import { mount } from '@vue/test-utils'
import ImageViewer from '../index.vue'

describe('ImageViewer.vue', () => {
  test('render', () => {
    const wrapper = mount(ImageViewer, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain(
      'md-image-viewer-box'
    )
  })
})
