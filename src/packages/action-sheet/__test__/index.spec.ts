import { mount } from '@vue/test-utils'
import ActionSheet from '../index.vue'

describe('ActionSheet.vue', () => {
  test('render', () => {
    const wrapper = mount(ActionSheet, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-action-sheet')
  })
})
