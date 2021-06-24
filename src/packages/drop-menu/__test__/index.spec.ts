import { mount } from '@vue/test-utils'
import DropMenu from '../index'

describe('DropMenu.vue', () => {
  const data = [
    {
      text: 'hello',
      options: [
        {
          value: 'world',
          text: 'world',
        },
      ],
    },
  ]

  test('render', () => {
    const wrapper = mount(DropMenu, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-drop-menu')
  })

  test('click event', async () => {
    const wrapper = mount(DropMenu, {
      props: {
        data,
      },
    })
    wrapper.vm.onBarItemClick()
    expect(wrapper.vm.isPopupShow).toBe(false)
    wrapper.vm.onBarItemClick(wrapper.vm.data[0], 0)
    expect(wrapper.vm.isPopupShow).toBe(true)
    wrapper.vm.onListBeforeHide()
    expect(wrapper.vm.activeMenuBarIndex).toBe(-1)
  })

  test('drop-menu bar item click', (done) => {
    const wrapper = mount(DropMenu, {
      props: {
        data: [
          {
            text: 'hello',
            options: [
              {
                value: 'world',
                text: 'world',
              },
            ],
          },
        ],
        defaultValue: ['world'],
      },
    })
    const barItem = wrapper.find('.bar-item')
    const mockData = [{ value: 'world', text: 'world' }]

    barItem.trigger('click')
    wrapper.vm.$nextTick(() => {
      expect(barItem.classes('active')).toBeTruthy()
      expect(wrapper.vm.isPopupShow).toBeTruthy()
      expect(
        JSON.stringify(wrapper.vm.activeMenuListData)
      ).toBe(JSON.stringify(mockData))

      const listItem = wrapper.findAll('.md-radio-item')
      expect(listItem.length).toBe(1)
      barItem.trigger('click')
      wrapper.setProps({ data: [] })
      done()
    })
  })

  test('drop-menu events', (done) => {
    const wrapper = mount(DropMenu, {
      props: {
        data: [
          {
            text: 'hello',
            options: [
              {
                value: 'world',
                text: 'world',
              },
            ],
          },
        ],
      },
    })
    const barItem = wrapper.find('.bar-item')
    barItem.trigger('click')
    expect(wrapper.vm.isPopupShow).toBeTruthy()
    expect(wrapper.vm.activeMenuBarIndex).toBe(0)
    setTimeout(() => {
      const listItem = wrapper.find('.md-radio-item')
      listItem.trigger('click')
      expect(wrapper.emitted('change')).toBeTruthy()
      setTimeout(() => {
        done()
      }, 500)
    }, 500)
  })

  test('Show and Hide event', () => {
    const wrapper = mount(DropMenu, {})
    wrapper.vm.onListShow()
    expect(wrapper.emitted('show')).toBeTruthy()
    wrapper.vm.onListHide()
    expect(wrapper.emitted('hide')).toBeTruthy()
  })

  test('install', () => {
    expect(
      require('vue').createApp(DropMenu).use(DropMenu)
    ).toBeTruthy()
  })
})
