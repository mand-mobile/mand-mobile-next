import { mount } from '@vue/test-utils'
import TextareaItem from '../index'

describe('TextareaItem.vue', () => {
  test('render', () => {
    const wrapper = mount(TextareaItem, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-textarea-item')
  })

  test('props value should be work', () => {
    const wrapper = mount(TextareaItem, {
      props: {
        rows: 6,
        maxHeight: 300,
        maxLength: 10,
        autosize: true,
        modelValue: '1',
        solid: true,
      },
    })
    expect(wrapper.props('maxHeight')).toBe(300)
    expect(wrapper.props('maxLength')).toBe(10)
    expect(wrapper.props('autosize')).toBe(true)
    expect(wrapper.props('modelValue')).toBe('1')
    expect(wrapper.props('rows')).toBe(6)
    expect(wrapper.html()).toContain('is-solid')
  })

  test('test async data', (done) => {
    const wrapper = mount(TextareaItem, {
      props: {
        maxHeight: 300,
        maxLength: 10,
        autosize: true,
        value: '',
      },
    })
    wrapper.setProps({ maxHeight: 200 })
    const textarea = wrapper.vm.$refs.textarea
    // 模拟本来高度342
    textarea.style.height = '342px'
    // 模拟数据异步更新
    Object.defineProperty(
      HTMLTextAreaElement.prototype,
      'scrollHeight',
      { configurable: true, value: 300 }
    )
    wrapper.setProps({ value: '123' })
    // 验证最终的高度, 以最大高度为准
    setTimeout(() => {
      expect(textarea.style.height).toBe('200px')
      done()
    }, 100)
  })

  test('props clearable should be work', () => {
    const wrapper = mount(TextareaItem, {
      props: {
        clearable: true,
      },
    })
    expect(wrapper.html()).toContain(
      'md-textarea-item__clear'
    )
  })

  test('props clearable should be work', () => {
    const wrapper = mount(TextareaItem, {
      props: {
        placeholder: 'this is placeholder text',
      },
    })
    expect(wrapper.html()).toContain(
      'this is placeholder text'
    )
  })

  test('props error should be work', () => {
    const wrapper = mount(TextareaItem, {
      props: {
        error: 'error',
      },
    })
    expect(wrapper.html()).toContain('md-textarea-item-msg')
  })

  test('input with delete icon', () => {
    const wrapper = mount(TextareaItem, {
      props: {
        clearable: true,
      },
    })
    expect(wrapper.html()).toContain(
      'md-textarea-item__clear'
    )
    const clearBtn = wrapper.find(
      '.md-textarea-item__clear'
    )
    clearBtn.trigger('click')
    expect(wrapper.vm.inputValue).toBe('')
  })

  test('props formation should be work', () => {
    const wrapper = mount(TextareaItem, {
      props: {
        formation(curValue: string) {
          return {
            value: curValue.replace(/\d/g, ''),
          }
        },
      },
    })
    expect(wrapper.vm.formation('abc22').value).toBe('abc')
  })

  test('computed isInputEmpty should be work', () => {
    const wrapper = mount(TextareaItem, {
      props: {
        inputValue: '',
      },
    })
    expect(wrapper.vm.isInputEmpty).toBe(true)
  })

  test('focus and blur', (done) => {
    const wrapper = mount(TextareaItem, {
      props: {
        modelValue: '1',
      },
    })
    wrapper.vm.onBlur()
    expect(wrapper.vm.isInputFocus).toBe(false)
    setTimeout(() => {
      done()
    }, 220)
    wrapper.vm.onFocus()
    expect(wrapper.vm.isInputFocus).toBe(true)
  })

  test('event should be work', () => {
    const wrapper = mount(TextareaItem)
    const inputEle = wrapper.find('textarea')
    const inputContent = '用户输入内容'
    inputEle.setValue(inputContent)
    inputEle.trigger('keyup')
    inputEle.trigger('keydown')
    expect(wrapper.emitted()).toBeTruthy()
    expect(wrapper.vm.inputValue).toBe(inputContent)
  })

  test('install', () => {
    expect(
      require('vue')
        .createApp(TextareaItem)
        .use(TextareaItem)
    ).toBeTruthy()
  })
})
