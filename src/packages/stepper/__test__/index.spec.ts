import { mount } from '@vue/test-utils'
import Stepper from '../index.vue'

describe('Stepper.vue', () => {
  test('render', () => {
    const wrapper = mount(Stepper, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-stepper')
  })

  test('props-disabled', () => {
    const wrapper = mount(Stepper, {
      props: {
        disabled: true,
      },
    })
    expect(wrapper.classes()).toContain('disabled')
  })

  test('props-read-only', () => {
    const wrapper = mount(Stepper, {
      props: {
        readOnly: true,
      },
    })
    expect(wrapper.html()).toContain('readonly')
  })

  test('props-value ', () => {
    const wrapper = mount(Stepper, {
      props: {
        min: 1,
        max: 10,
        modelValue: 11,
      },
    })
    expect(wrapper.props().modelValue).toBe(11)
  })

  test('props-value-is-integer ', () => {
    const wrapper = mount(Stepper, {
      props: {
        isInteger: true,
        modelValue: 1,
      },
    })

    expect(wrapper.props().isInteger).toBe(true)
  })

  test('props-min', () => {
    const wrapper = mount(Stepper, {
      props: {
        min: 3,
        modelValue: 1,
      },
    })

    expect(wrapper.props().min).toBe(3)
  })

  test('props-step', () => {
    const wrapper = mount(Stepper, {
      props: {
        step: 1.3,
        modelValue: 1,
      },
    })

    expect(wrapper.props().step).toBe(1.3)
  })

  test('min is negative number click reduce should be -1 ', async () => {
    const wrapper = mount(Stepper, {
      props: {
        min: -12,
        max: 10,
        modelValue: 0,
      },
    })

    const div = wrapper.find('.md-stepper-button-reduce')
    expect(div.exists()).toBe(true)
    await div.trigger('click')

    expect(wrapper.find('input').element.value).toBe('-1')
  })

  test('min is negative and defaultval -10 click reduce should be ok', async () => {
    const wrapper = mount(Stepper, {
      props: {
        min: -12,
        max: 10,
        modelValue: -10,
      },
    })
    const div = wrapper.find('.md-stepper-button-reduce')
    await div.trigger('click')
    expect(wrapper.find('input').element.value).toBe('-11')

    await div.trigger('click')
    expect(wrapper.find('input').element.value).toBe('-12')

    await div.trigger('click')
    expect(wrapper.find('input').element.value).toBe('-12')
  })

  test('max is positive number and click add should be 1 ', async () => {
    const wrapper = mount(Stepper, {
      props: {
        min: -12,
        max: 10,
        modelValue: 0,
      },
    })

    const div = wrapper.find('.md-stepper-button-add')
    expect(div.exists()).toBe(true)
    await div.trigger('click')

    expect(wrapper.find('input').element.value).toBe('1')
  })

  test('max is 10 and defaultval 9 click add should be 10', async () => {
    const wrapper = mount(Stepper, {
      props: {
        min: -12,
        max: 10,
        modelValue: 9,
      },
    })

    const div = wrapper.find('.md-stepper-button-add')
    expect(div.exists()).toBe(true)

    await div.trigger('click')
    expect(wrapper.find('input').element.value).toBe('10')

    await div.trigger('click')
    expect(wrapper.find('input').element.value).toBe('10')
  })
})
