<template>
  <div class="md-example-child md-example-child-action-sheet-1">
    <md-button @click="$_showActionSheet">唤起动作面板</md-button>
  </div>
</template>

<script>
import ActionSheet from 'mand-mobile/lib/action-sheet'
import Button from 'mand-mobile/lib/button'
import Dialog from 'mand-mobile/lib/dialog'
export default {
  components: {
    'md-button': Button,
  },
  methods: {
    $_showActionSheet() {
      ActionSheet.create({
        value: true,
        title: '操作说明的标题',
        options: [
          {
            label: '选项1',
            value: 0,
          },
          {
            label: '选项2',
            value: 1,
          },
          {
            label: '选项3',
            value: 2,
          },
        ],
        defaultIndex: 1,
        invalidIndex: 2,
        cancelText: '取消',
        onCancel: this.$_cancel,
        onSelected: this.$_selected,
      })
    },
    $_selected(item) {
      Dialog.alert({
        content: `selected: ${JSON.stringify(item)}`,
      })
    },
    $_cancel() {
      Dialog.alert({
        content: 'cancel',
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
