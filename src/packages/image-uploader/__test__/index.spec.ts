import { mount } from '@vue/test-utils'
import ImageUploader from '../index'

describe('ImageUploader.vue', () => {
  test('render', () => {
    const wrapper = mount(ImageUploader, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-image-uploader')
  })
  test('install', () => {
    expect(
      require('vue')
        .createApp(ImageUploader)
        .use(ImageUploader)
    ).toBeTruthy()
  })
})
