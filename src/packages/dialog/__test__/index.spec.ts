import { mount } from '@vue/test-utils'
import Dialog from 'mand-mobile/dialog'
import type { Component } from 'vue'

describe('Dialog.vue', () => {
  test('props modelValue should be work', async () => {
    const wrapper: Component = mount(Dialog, {
      props: {
        modelValue: true,
      },
    })
    await wrapper.setProps({ modelValue: false })
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  test('props actions should be work', () => {
    const wrapper = mount(Dialog, {
      props: {
        actions: [
          {
            text: '取消',
            handler: () => {
              console.log('cancel')
            },
            disabled: true,
          },
          {
            text: '确认操作',
            handler: () => {
              console.log('confirm')
            },
          },
        ],
      },
    })
    wrapper.vm.actionHandler(wrapper.vm.actions[0])
    wrapper.vm.actionHandler(wrapper.vm.actions[1])
  })

  test('event should be work', async () => {
    const wrapper: Component = mount(Dialog, {
      props: {
        modelValue: false,
        actions: [
          {
            text: '确认操作',
          },
        ],
      },
    })
    await wrapper.vm.onShow()
    expect(wrapper.emitted('show')).toBeTruthy()
    await wrapper.vm.onHide()
    expect(wrapper.emitted('hide')[0][0]).toBeFalsy()
    wrapper.vm.actionHandler(wrapper.vm.actions[0])
    expect(
      wrapper.emitted('update:modelValue')
    ).toBeTruthy()
  })

  test('succeed dialog', () => {
    expect(
      Dialog.confirm({
        title: '确认',
        content: '请确认是否进行操作',
        confirmText: '确定',
        onConfirm: () =>
          console.log('[Dialog.confirm] confirm clicked'),
      })
    ).toBeTruthy()

    expect(
      Dialog.succeed({
        title: '成功',
        content: '恭喜您成功完成操作',
        confirmText: '确定',
        onConfirm: () =>
          console.log('[Dialog.succeed] confirm clicked'),
      })
    ).toBeTruthy()

    expect(
      Dialog.failed({
        title: '失败',
        content: '操作失败，请稍后重试',
        confirmText: '确定',
        onConfirm: () =>
          console.log('[Dialog.failed] confirm clicked'),
      })
    ).toBeTruthy()
  })

  test('Dialog.alert should be work', () => {
    const vm: Component = Dialog.alert({
      title: '警告',
      content: '您正在进行非法操作',
      cancelText: '取消',
      confirmText: '确定',
      transition: 'md-fade',
      onConfirm: () =>
        console.log('[Dialog.alert] confirm clicked'),
    })
    expect(vm.actions[0].handler()).toBeFalsy()
  })

  test('Dialog.confirm should be work', () => {
    const vm: Component = Dialog.confirm({
      title: '',
      content: '',
      confirmText: '确定',
      actions: [
        {
          text: '取消',
          handler: () => {
            console.log('cancel')
          },
          disabled: true,
        },
        {
          text: '确认操作',
          handler: () => {
            console.log('confirm')
          },
        },
      ],
    })
    expect(vm.actions[0].handler()).toBeFalsy()
    expect(vm.actions[1].handler()).toBeFalsy()
  })
})
