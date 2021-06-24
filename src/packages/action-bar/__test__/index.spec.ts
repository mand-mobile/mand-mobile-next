import { mount } from '@vue/test-utils'
import ActionBar from '../index'

describe('ActionBar.vue', () => {
  test('render', () => {
    const wrapper = mount(ActionBar, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-action-bar')
  })

  test('props value should be work', () => {
    const wrapper = mount(ActionBar, {
      props: {
        actions: [
          {
            text: '主要按钮',
            disabled: true,
          },
        ],
      },
    })
    expect(wrapper.text()).toContain('主要按钮')
    expect(wrapper.html()).toContain('disabled')
  })

  test('click event should be work', () => {
    const wrapper = mount(ActionBar, {
      props: {
        actions: [
          {
            text: '主要按钮',
            onClick: (ev: Event, action: any) => {
              console.log('action', ev, action)
            },
          },
        ],
      },
    })
    wrapper.vm.onBtnClick(event, wrapper.vm.actions[0])
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  test('slot should be work', () => {
    const wrapper = mount(ActionBar, {
      slots: {
        default: '<span class="inner-slot"></span>',
      },
    })
    expect(wrapper.html()).toContain('md-action-bar-text')
  })

  test('install', () => {
    expect(
      require('vue').createApp(ActionBar).use(ActionBar)
    ).toBeTruthy()
  })
})
