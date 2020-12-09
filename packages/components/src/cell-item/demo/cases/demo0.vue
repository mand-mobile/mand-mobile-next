<template>
  <div class="md-example-child md-example-child-cell-item md-example-child-cell-item-0">
    <md-field>
      <md-cell-item title="普通条目" />
      <md-cell-item title="动作条目" arrow @click="onClick" />
      <md-cell-item title="禁用条目" disabled no-border/>
    </md-field>
  </div>
</template>

<script>
import Dialog from 'mand-mobile/lib/dialog'
import Field from 'mand-mobile/lib/field'
import CellItem from 'mand-mobile/lib/cell-item'

export default {
  components: {
    'md-field': Field,
    'md-cell-item': CellItem,
  },

  data() {
    return {
      open: false,
    }
  },

  methods: {
    onClick() {
      Dialog.alert({
        content: '点击了',
      })
    },
  },
}

</script>
