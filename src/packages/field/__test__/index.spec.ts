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

  test('props title should be work', () => {
    const wrapper = mount(Field, {
      props: {
        title: 'this is title',
      },
    })
    expect(wrapper.text()).toContain('this is title')
  })

  test('props content should be work', () => {
    const wrapper = mount(Field, {
      props: {
        title: 'this is content',
      },
    })
    expect(wrapper.text()).toContain('this is content')
  })

  test('props disabled should be work', () => {
    const wrapper = mount(Field, {
      props: {
        disabled: true,
      },
    })
    expect(wrapper.html()).toContain('is-disabled')
  })
})
