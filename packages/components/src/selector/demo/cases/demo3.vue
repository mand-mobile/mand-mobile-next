<template>
  <div class="md-example-child md-example-child-selector md-example-child-selector-3">
    <md-field>
      <md-field-item
        title="Check模式"
        :addon="selectorValue"
        @click="showSelector"
        arrow
      />
    </md-field>
    <md-selector
      v-model="isSelectorShow"
      :data="data[0]"
      title="Check模式"
      min-height="320px"
      okText="确认"
      cancelText="取消"
      @confirm="onSelectorConfirm"
      is-check
    ></md-selector>
  </div>
</template>

<script>
import Selector from 'mand-mobile/lib/selector'
import Field from 'mand-mobile/lib/field'
import FieldItem from 'mand-mobile/lib/field/item'

export default {
  name: 'selector-demo',
  components: {
    'md-selector': Selector,
    'md-field': Field,
    'md-field-item': FieldItem,
  },
  data() {
    return {
      isSelectorShow: false,
      data: [
        [
          {
            value: '1',
            text: '选项一',
          },
          {
            value: '2',
            text: '选项二',
          },
          {
            value: '3',
            text: '选项三',
            disabled: true,
          },
          {
            value: '4',
            text: '选项四',
          },
        ],
      ],
      selectorValue: '',
    }
  },
  methods: {
    showSelector() {
      this.isSelectorShow = true
    },
    onSelectorConfirm({text}) {
      this.selectorValue = text
    },
  },
}

</script>
