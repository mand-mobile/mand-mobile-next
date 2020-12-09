<template>
  <div>
    <md-button inline size="small" @click="alert">警告弹窗</md-button>
    <md-button inline size="small" @click="confirm">确认弹窗</md-button>
    <md-button inline size="small" @click="succeedConfirm">成功弹窗</md-button>
    <md-button inline size="small" @click="failedConfirm">失败弹窗</md-button>
  </div>
</template>

<script>
import Dialog from 'mand-mobile/lib/dialog'
import Button from 'mand-mobile/lib/button'

export default {
  components: {
    'md-button': Button,
  },
  methods: {
    alert() {
      Dialog.alert({
        title: '警告',
        content: '您正在进行非法操作',
        cancelText: '取消',
        confirmText: '确定',
        // eslint-disable-next-line no-console
        onConfirm: () => console.log('[Dialog.alert] confirm clicked'),
      })
    },
    confirm() {
      Dialog.confirm({
        title: '确认',
        content: '请确认是否进行操作',
        confirmText: '确定',
        // eslint-disable-next-line no-console
        onConfirm: () => console.log('[Dialog.confirm] confirm clicked'),
      })
    },
    succeedConfirm() {
      Dialog.succeed({
        title: '成功',
        content: '恭喜您成功完成操作',
        confirmText: '确定',
        // eslint-disable-next-line no-console
        onConfirm: () => console.log('[Dialog.succeed] confirm clicked'),
      })
    },
    failedConfirm() {
      Dialog.failed({
        title: '失败',
        content: '操作失败，请稍后重试',
        confirmText: '确定',
        // eslint-disable-next-line no-console
        onConfirm: () => console.log('[Dialog.failed] confirm clicked'),
      })
    },
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '单例模式',
  },
  'en-US': {
    title: 'Singleton',
  },
}
// #endregion ignore

</script>
