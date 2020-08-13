<template>
  <div class="md-example-child md-example-child-action-sheet">
    <md-button @click="$_showActionSheet">唤起动作面板</md-button>
  </div>
</template>

<script>
import ActionSheet from 'mand-mobile/lib/action-sheet'
import Button from 'mand-mobile/lib/button'
import Dialog from 'mand-mobile/lib/dialog'
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
      ActionSheet.create({
        itemList: ['选项1', '选项2', '选项3'],
        success: this.$_selected,
        fail: this.$_cancel,
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

</script>