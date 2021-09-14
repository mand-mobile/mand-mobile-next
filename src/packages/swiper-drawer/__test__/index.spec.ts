import { mount } from '@vue/test-utils'
import SwiperDrawer from '../index.vue'

describe('SwiperDraw.vue', () => {
  test('render', () => {
    const wrapper = mount(SwiperDrawer, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-swiper-drawer')
  })
})
