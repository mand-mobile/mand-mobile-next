<script lang="ts">
export default {
  name: 'SelectorDemo',
  title: '基本',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import MdSelector from 'mand-mobile/selector'
import MdField from 'mand-mobile/field'
import MdFieldItem from 'mand-mobile/field-item'
import MdIcon from 'mand-mobile/icon'

const data = ref([
  {
    value: 'A',
    text: '选项一',
    describe: '使用slot-scope',
  },
  {
    value: 'B',
    text: '选项二',
    describe: '使用slot-scope',
  },
  {
    value: 'C',
    text: '选项三',
    describe: '使用slot-scope',
    disabled: true,
  },
  {
    value: 'D',
    text: '选项四',
    describe: '使用slot-scope',
  },
])

const isSelectorShow = ref(false)
const showSelector = () => (isSelectorShow.value = true)

const selectorValue = ref('B')
const onSelectorChoose = (item: any) => {
  console.log(item)
}
const onHide = () => {
  console.log('hide')
}
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-selector
      md-example-child-selector-1
    "
  >
    <md-field>
      <md-field-item
        title="自定义"
        :content="selectorValue"
        arrow
        solid
        @click="showSelector"
      />
    </md-field>
    <md-selector
      v-model="selectorValue"
      v-model:visible="isSelectorShow"
      class="md-example-child-selector-1"
      :data="data"
      hide-title-bar
      is-check
      icon-size="lg"
      @select="onSelectorChoose"
      @hide="onHide"
    >
      <template #header>
        <div class="selector-footer">Header Slot</div>
      </template>
      <template #default="{ option, index, selected }">
        <div
          class="selector-item-body"
          :class="{ disabled: option.disabled, selected }"
        >
          <div class="selector-item-left">
            <span
              class="holder"
              v-text="option.value"
            ></span>
          </div>
          <div class="selector-item-content">
            <p
              class="selector-item-title"
              v-text="option.text"
            ></p>
            <p
              class="selector-item-brief"
              v-text="`${option.describe}-${index}`"
            ></p>
          </div>
          <md-icon
            :name="!selected ? 'check' : 'checked'"
            size="lg"
          ></md-icon>
        </div>
      </template>
      <template #footer>
        <div class="selector-footer">Footer Slot</div>
      </template>
    </md-selector>
  </div>
</template>

<style lang="stylus">
.md-example-child-selector-1
  .selector-header, .selector-footer
    padding 15px 40px
    font-size 16px
    color #ccc
  .selector-item-body
    display flex
    align-items center
    &.selected
      .selector-item-content
        color #2f86f6
    &.disabled
      opacity .3
    .selector-item-left
      flex-shrink 0
      margin-right 32px
      .holder
        display block
        width 88px
        height 88px
        border-radius 44px
        background-color #e6e6e6
        font-size 32px
        font-weight 500
        color #2f86f6
        text-align center
        line-height 88px
    .selector-item-content
      flex 1
      color #111a34
      font-size 32px
      line-height 1.2
      .selector-item-title
        line-height 1.2
      .selector-item-brief
        color #858b9c
        font-size 24px
        line-height 1.4
        margin-top 8px
    .check
      color #eee
    .checked
      color color-primary
</style>
