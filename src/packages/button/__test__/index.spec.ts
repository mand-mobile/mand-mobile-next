import { mount } from '@vue/test-utils'
import Button from '../index.vue'
describe('Button.vue', () => {
  test('render', () => {
    const wrapper = mount(Button, {
      props: {
        name: 'scan',
      },
    })
    expect(wrapper.classes()).toContain('md-button')
  })

  test('props type should be work', async () => {
    const wrapper = mount(Button, {
      props: {
        type: 'disabled',
      },
    })
    expect(wrapper.classes()).toContain('disabled')
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  test('props nativeType should be work', () => {
    const wrapper = mount(Button, {
      props: {
        nativeType: 'submit',
      },
    })
    expect(wrapper.html()).toContain('type="submit"')
  })

  test('props icon should be work', () => {
    const wrapper = mount(Button, {
      props: {
        icon: 'success',
      },
    })
    expect(wrapper.html()).toContain('md-icon-success')
  })

  test('props plain should be work', () => {
    const wrapper = mount(Button, {
      props: {
        plain: true,
      },
    })
    expect(wrapper.classes()).toContain('plain')
  })

  test('props round should be work', () => {
    const wrapper = mount(Button, {
      props: {
        round: true,
      },
    })
    expect(wrapper.classes()).toContain('round')
  })

  test('props inline should be work', () => {
    const wrapper = mount(Button, {
      props: {
        inline: true,
      },
    })
    expect(wrapper.classes()).toContain('inline')
  })

  test('props inactive should be work', () => {
    const wrapper = mount(Button, {
      props: {
        inactive: true,
      },
    })
    expect(wrapper.classes()).toContain('inactive')
  })

  test('props loading should be work', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true,
      },
    })
    expect(wrapper.html()).toContain('md-button-loading')
  })

  test('slot should be work', () => {
    const wrapper = mount(Button, {
      slots: {
        default:
          '<span class="inner-slot">this is slot</span>',
      },
    })
    expect(wrapper.html()).toContain('this is slot')
  })
})
