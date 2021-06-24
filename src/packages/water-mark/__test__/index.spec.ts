import { mount } from '@vue/test-utils'
import WaterMark from '../index'

describe('WaterMark.vue', () => {
  test('render', () => {
    const wrapper = mount(WaterMark, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-water-mark')
  })

  test('props content should be work', () => {
    const wrapper = mount(WaterMark, {
      props: {
        spacing: 10,
        content: 'MAND MOBILE',
      },
    })
    expect(wrapper.html()).toContain('water-mark-canvas')
  })

  test('slots should be work', () => {
    const wrapper = mount(WaterMark, {
      props: {
        spacing: '10vh',
      },
      slots: {
        watermark: ['<div>MAND MOBILE</div>'],
      },
    })
    expect(wrapper.text()).toContain('MAND MOBILE')
  })

  test('computed should be work', () => {
    const wrapper = mount(WaterMark, {
      props: {
        spacing: '10px',
        content: 'this is content',
      },
    })
    const canvasRef = wrapper.vm.$refs.canvas
    expect(canvasRef).toBeTruthy()
  })

  test('install', () => {
    expect(
      require('vue').createApp(WaterMark).use(WaterMark)
    ).toBeTruthy()
  })
})
