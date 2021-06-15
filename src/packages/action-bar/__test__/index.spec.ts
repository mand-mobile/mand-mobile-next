import { mount } from '@vue/test-utils'
import ActionBar from '../index.vue'

describe('ActionBar.vue', () => {
  test('render', () => {
    const wrapper = mount(ActionBar, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-action-bar')
  })
})
