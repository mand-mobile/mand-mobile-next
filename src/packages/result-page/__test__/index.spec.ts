import { mount } from '@vue/test-utils'
import ResultPage from '../index'

describe('ResultPage.vue', () => {
  test('render', () => {
    const wrapper = mount(ResultPage, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-result')
  })

  test('computed  should be work', () => {
    const wrapper = mount(ResultPage, {
      props: {
        text: 'this is text',
        subtext: 'this is subtext',
      },
    })
    expect(wrapper.vm.actualText).toBe('this is text')
    expect(wrapper.vm.actualSubText).toBe('this is subtext')
  })

  test('props button should be work', () => {
    const wrapper = mount(ResultPage, {
      props: {
        buttons: [
          {
            text: '普通按钮',
            handler() {
              return 666
            },
          },
          {
            text: '高亮按钮',
            type: 'primary',
            handler() {
              console.log(888)
            },
          },
        ],
      },
    })
    expect(wrapper.html()).toContain('普通按钮')
    expect(wrapper.vm.buttons[0].handler()).toBe(666)
  })

  test('install', () => {
    expect(
      require('vue').createApp(ResultPage).use(ResultPage)
    ).toBeTruthy()
  })
})
