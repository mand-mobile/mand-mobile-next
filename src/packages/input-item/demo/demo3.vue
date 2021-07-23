<script lang="ts">
export default {
  title: '大尺寸金融表单',
  titleEnUS: 'Large size financial input-item',
}
</script>
<script setup lang="ts">
import { ref, computed } from 'vue'
import MdInputItem from 'mand-mobile-next/input-item'
import MdField from 'mand-mobile-next/field'
import MdIcon from 'mand-mobile-next/icon'
import Toast from 'mand-mobile-next/toast'

const val = ref('')
const size = computed<any>(() =>
  val.value.length > 10 ? 'small' : 'large'
)

const onClick = () => {
  Toast.create({
    content: 'some information',
    icon: 'warn',
  })
}
</script>

<template>
  <div
    class="md-example-child md-example-child-input-item-3"
  >
    <md-field title="转出金额(元)">
      <template #action>
        <div class="field-operator" @click="onClick">
          <md-icon name="info"></md-icon>
        </div>
      </template>
      <md-input-item
        v-model="val"
        type="money"
        brief="理财提示文案，字符超出10个自动变小"
        placeholder="最多30万元"
        :size="size"
        is-amount
        is-highlight
      >
        <template #right>
          <div
            class="input-operator"
            @click="val = '300000'"
          >
            全部取出
          </div>
        </template>
      </md-input-item>
    </md-field>
  </div>
</template>

<style lang="stylus">
.md-example-child-input-item-3
  .md-field
    padding-bottom 20px
    .md-field-title
      .value
        display flex
        align-items center
        justify-content flex-end
        .field-operator
          display flex
          align-items center
    .md-field-item-content::before
      background-color #C5CAD5
    .input-operator
      font-size 28px
      color #5878B4
</style>
