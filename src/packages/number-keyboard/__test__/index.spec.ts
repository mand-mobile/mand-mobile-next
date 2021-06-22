import { mount } from '@vue/test-utils'
import NumberKeyboard from '../index.vue'

describe('NumberKeyboard.vue', () => {
  test('render', () => {
    const wrapper = mount(NumberKeyboard, {
      props: {
        isView: true,
      },
    })
    expect(wrapper.classes()).toContain(
      'md-number-keyboard-container'
    )
  })
})
