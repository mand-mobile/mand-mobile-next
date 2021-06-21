import { mount, VueWrapper } from '@vue/test-utils'
import Radio from '../index.vue'
import { RadioList as MdRadioList } from 'mand-mobile/radio'
import MdRadioGroup from 'mand-mobile/radio-group'

describe('Radio.vue', () => {
  test('render', () => {
    const wrapper = mount(Radio, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-radio')
  })

  test('computed currentIcon should be work', () => {
    const wrapper = mount(Radio, {
      props: {
        disabled: false,
        modelValue: '0',
        name: '0',
      },
    })
    wrapper.vm.clickHandler()
    expect(wrapper.vm.currentIcon).toBe('checked')
  })

  test('create a radio list', (done) => {
    const wrapper = mount(MdRadioList, {
      props: {
        modelValue: 0,
        options: [
          { value: 0, text: '选项1' },
          { value: 1, text: '选项2', disabled: true },
          { value: 2, text: '选项3' },
        ],
        defaultIndex: 1,
      },
    })
    expect(
      wrapper.findAll('.md-radio-item').length
    ).toEqual(3)

    wrapper.vm.selectHandler({ value: 2 })
    setTimeout(() => {
      expect(wrapper.vm.selectedValue).toEqual(2)
    }, 300)

    wrapper.setProps({
      modelValue: 1,
      options: [{ text: '选项1' }, { text: '选项2' }],
    })
    wrapper.vm.$nextTick(() => {
      expect(
        wrapper.findAll('.md-radio-item').length
      ).toEqual(2)
      done()
    })

    wrapper.vm.focusHandler()
    expect(wrapper.vm.selectedValue).toBe(0)

    wrapper.vm.blurHandler()
    expect(wrapper.vm.inputSelected).toBe(false)
  })
})
