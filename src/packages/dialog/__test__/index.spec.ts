import { mount } from '@vue/test-utils'
import Dialog from '../index.vue'

describe('Dialog.vue', () => {
  test('render', () => {
    const wrapper = mount(Dialog, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-dialog')
  })
})
