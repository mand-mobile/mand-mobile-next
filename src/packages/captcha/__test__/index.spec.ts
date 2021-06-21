import { mount } from '@vue/test-utils'
import Captcha from '../index.vue'

describe('Captcha.vue', () => {
  test('render', () => {
    const wrapper = mount(Captcha, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-captcha')
  })
})
