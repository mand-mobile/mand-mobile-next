import { mount } from '@vue/test-utils'
import Field from '../index'
import MdFieldItem from 'mand-mobile-next/field-item'

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

  test('props addon should be work', () => {
    const wrapper = mount(MdFieldItem, {
      props: {
        addon: 'this is addon',
      },
    })
    expect(wrapper.text()).toContain('this is addon')
  })

  test('props arrow should be work', () => {
    const wrapper = mount(MdFieldItem, {
      props: {
        arrow: true,
      },
    })
    expect(wrapper.html()).toContain('arrow-right')
  })

  test('install', () => {
    expect(
      require('vue')
        .createApp(MdFieldItem)
        .use(MdFieldItem)
        .use(Field)
    ).toBeTruthy()
  })
})
