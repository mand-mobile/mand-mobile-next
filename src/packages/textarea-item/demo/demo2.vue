<script lang="ts">
export default {
  name: 'TextareaItemDemo',
  title: '插槽',
  titleEnUS: 'Slot',
}
</script>
<script setup lang="ts">
import MdTextareaItem from 'mand-mobile/textarea-item'
import MdField from 'mand-mobile/field'
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-textarea
      md-example-child-textarea-2
    "
  >
    <md-field>
      <md-textarea-item
        v-model="value"
        class="demo2"
        :autosize="true"
        :max-length="100"
        :max-height="150"
        placeholder="描述信息在100字以内"
      >
        {{ value }}
        <template #footer>
          <p class="demo2-footer">
            <span
              v-if="value.length"
              class="demo2-footer-left"
              >{{ value.length }}/100</span
            >
            <span v-else></span>
            <span class="demo2-footer-right">页脚文案</span>
          </p>
        </template>
      </md-textarea-item>
    </md-field>
  </div>
</template>

<style lang="stylus" scoped>
.md-example-child-textarea-2
  .demo2-footer
    display flex
    justify-content space-between
    color #999
    font-size 24px
</style>
