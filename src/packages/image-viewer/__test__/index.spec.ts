import { mount } from '@vue/test-utils'
import ImageViewer from '../index'
import type { Component } from 'vue'

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

  test('create a simple image-viewer', () => {
    const wrapper = mount(ImageViewer)
    expect(wrapper.vm.visible).toBe(false)
    expect(wrapper.vm.defaultIndex).toBe(0)
    expect(wrapper.vm.hasDots).toBe(true)
  })

  test('imageViewer method afterChange', () => {
    const wrapper = mount(ImageViewer)
    wrapper.vm.afterChange(1, 2)
    expect(wrapper.vm.currentImgIndex).toBe(2)
  })

  test('imageViewer method viewerClick', () => {
    const wrapper = mount(ImageViewer)
    wrapper.vm.closeViewer()
    expect(wrapper.vm.isViewerShow).toBe(false)
  })

  test('event should be work', () => {
    const wrapper: Component = mount(ImageViewer, {
      props: {
        list: ['aaa.jpg', 'bbb.jpg'],
      },
    })
    wrapper.vm.showViewer(wrapper.vm.list[0])
    expect(wrapper.emitted('update:visible')[0][0]).toBe(
      true
    )
    wrapper.vm.onDeleteImage(1)
    expect(wrapper.emitted('delete')[0][0]).toBe(1)
  })

  test('install', () => {
    expect(
      require('vue').createApp(ImageViewer).use(ImageViewer)
    ).toBeTruthy()
  })
})
