<template>
  <div class="md-example-child md-example-child-action-sheet">
    <md-button @click="$_showActionSheet">唤起动作面板</md-button>
  </div>
</template>

<script>
import ActionSheet from '../../index'
import Button from '../../../button'
import Dialog from '../../../dialog'

export default {
  name: 'action-sheet-demo',
  /* DELETE */
  title: '单例模式',
  titleEnUS: 'Singleton',
  height: 500,
  /* DELETE */
  components: {
    'md-button': Button,
  },
  methods: {
    $_showActionSheet() {

    // #ifdef MP
      ActionSheet.create({
        itemList: ['选项1', '选项2', '选项3'],
        success: this.$_selected,
        fail: this.$_cancel,
      })
    // #endif
    // #ifdef H5
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
    // #endif
    },
    $_selected(item) {
      Dialog.alert({
        content: `selected: ${JSON.stringify(item)}`,
      })
      console.log('action-sheet selected:', JSON.stringify(item))
    },
    $_cancel() {
      Dialog.alert({
        content: 'cancel',
      })
      console.log('action-sheet cancel')
    },
  },
}

</script>
