<script lang="ts">
export default {
  name: 'AgreeDemo',
  title: '未选中不可用状态',
  titleEnUS: 'Unselected and unavailable state',
  height: 120,
}
</script>
<script setup lang="ts">
import MdAgree from 'mand-mobile-next/agree'
import { ref } from 'vue'

const agreeConf = ref({
  checked: false,
  name: 'agree3',
  size: 'md',
  disabled: true,
  introduction: '未选中不可用状态',
})
const onChange = (
  name: string,
  checked: boolean,
  event: Event
) => {
  console.log('agree', name, checked, event)
}
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-agree
      md-example-child-3
    "
  >
    <md-agree
      v-model="agreeConf.checked"
      :disabled="agreeConf.disabled"
      :size="agreeConf.size"
      @change="
        onChange(agreeConf.name, agreeConf.checked, $event)
      "
    >
      本人承诺投保人已充分了解本保险产品，并保证投保信息的真实性，理解并同意
    </md-agree>
  </div>
</template>
