import { mount } from '@vue/test-utils'
import ImageReader from '../index'
import { imageProcessor } from '../image-processor'
import { dataUrl } from './fileMock'

describe('ImageReader.vue', () => {
  test('render', () => {
    const wrapper = mount(ImageReader, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-image-reader')
  })

  test('create a image-reader', () => {
    const wrapper = mount(ImageReader, {
      props: {
        size: 10,
        accept: ['jpeg', 'png'],
      },
    })
    expect(wrapper.find('input')).toBeTruthy()
  })

  test('image-reader processor', () => {
    imageProcessor({
      dataUrl,
      width: 200,
      height: 200,
      quality: 0.1,
    })
  })

  test('install', () => {
    expect(
      require('vue').createApp(ImageReader).use(ImageReader)
    ).toBeTruthy()
  })
})
