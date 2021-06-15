<script lang="ts">
export default {
  name: 'CheckDemo',
  title: '复选项组',
}
</script>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Button } from 'mand-mobile/button'
import {
  Check as MdCheck,
  CheckGroup,
} from 'mand-mobile/check'
import type { ComponentPublicInstance } from 'vue'

const favorites = reactive<Array<string | number>>([
  'banana',
])
/**
 * For reactive array you should update  outside
 */
const updateHandler = (
  name: Array<string | number> | undefined
) => {
  if (name) {
    favorites.length = 0
    favorites.push(...name)
  }
}

const favorites2 = ref(['apple'])
const group =
  ref<ComponentPublicInstance<{
    toggleAll: (all?: boolean) => void
  }> | null>(null)

const toggleAll = (all?: boolean) => {
  group.value?.toggleAll(all)
}
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-check
      md-example-child-check-2
    "
  >
    <check-group
      :model-value="favorites"
      @update:modelValue="updateHandler"
    >
      <md-check name="watermelon" label="西瓜" />
      <md-check name="apple" label="苹果" />
      <md-check name="banana" label="香蕉" />
      <md-check name="orange" label="橙子" />
      <md-check name="tomato" label="西红柿" disabled />
    </check-group>
    <br />
    <check-group ref="group" v-model="favorites2">
      <md-check name="watermelon" label="西瓜" />
      <md-check name="apple" label="苹果" />
      <md-check name="banana" label="香蕉" />
      <md-check name="orange" label="橙子" />
      <md-check name="tomato" label="西红柿" disabled />
    </check-group>
    <Button
      type="primary"
      size="small"
      inline
      @click="toggleAll()"
    >
      全选
    </Button>

    <Button size="small" inline @click="toggleAll(false)">
      反选
    </Button>
  </div>
</template>

<style lang="stylus">
.md-example-child-check-2
  .md-button
    margin-right 4px
  .md-check-box
    margin-right 8px
</style>
