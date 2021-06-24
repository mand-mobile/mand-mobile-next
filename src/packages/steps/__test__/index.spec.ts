import { mount } from '@vue/test-utils'
import Steps from '../index'

describe('Steps.vue', () => {
  test('render', () => {
    const wrapper = mount(Steps, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-steps')
  })

  test('props steps should be works', () => {
    const wrapper = mount(Steps, {
      props: {
        steps: [
          {
            name: '登录/注册',
          },
          {
            name: '申请征信报告',
          },
          {
            name: '提取征信报告',
          },
        ],
      },
    })
    expect(wrapper.html()).toContain('提取征信报告')
  })

  test('props current should be works', () => {
    const wrapper = mount(Steps, {
      props: {
        steps: [
          {
            name: '登录/注册',
          },
          {
            name: '申请征信报告',
          },
          {
            name: '提取征信报告',
          },
        ],
        current: 1,
      },
    })
    expect(wrapper.props().current).toBe(1)
  })

  test('props current total should be works', () => {
    const wrapper = mount(Steps, {
      props: {
        steps: [
          {
            name: '登录/注册',
          },
          {
            name: '申请征信报告',
          },
          {
            name: '提取征信报告',
          },
        ],
        current: 4,
        verticalAdaptive: false,
        direction: 'vertical',
      },
    })
    expect(wrapper.html()).toContain('md-icon-success')
  })

  test('props verticalAdaptive should be works', () => {
    const wrapper = mount(Steps, {
      props: {
        steps: [
          {
            name: '登录/注册',
          },
          {
            name: '申请征信报告',
          },
          {
            name: '提取征信报告',
          },
        ],
        direction: 'vertical',
        verticalAdaptive: true,
        transition: true,
        current: 2,
      },
    })
    expect(wrapper.html()).toContain('vertical-adaptive')
  })

  test('install', () => {
    expect(
      require('vue').createApp(Steps).use(Steps)
    ).toBeTruthy()
  })
})
