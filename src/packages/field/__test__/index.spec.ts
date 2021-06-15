import { mount } from '@vue/test-utils'
import Field from '../index.vue'

describe('Field.vue', () => {
  test('render', () => {
    const wrapper = mount(Field, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.html()).toContain('md-field')
  })
})
