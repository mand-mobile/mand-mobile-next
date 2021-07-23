<script lang="ts">
export default {
  name: 'AgreeDemo',
  title: '选中状态',
  titleEnUS: 'Selected state',
  height: 120,
}
</script>
<script setup lang="ts">
import MdAgree from 'mand-mobile-next/agree'
import { ref } from 'vue'

const agreeConf = ref({
  checked: true,
  name: 'agree0',
  size: 'md',
  disabled: false,
  introduction: '选中状态',
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
      md-example-child-0
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
      本人承诺投保人已充分了解本保险产品，并保证投保信息的真实性，理解并同意<a>《投保须知》</a>,
      <a>《保险条款》</a>
    </md-agree>
  </div>
</template>
