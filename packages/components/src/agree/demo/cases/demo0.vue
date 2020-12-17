<template>
  <div class="md-example-child md-example-child-agree md-example-child-0">
    <md-agree
      v-model="agreeConf.checked"
      :disabled="agreeConf.disabled"
      :size="agreeConf.size"
      @change="onChange(agreeConf.name, agreeConf.checked, $event)"
    >
    本人承诺投保人已充分了解本保险产品，并保证投保信息的真实性，理解并同意<a>《投保须知》</a>, <a>《保险条款》</a>
    </md-agree>
  </div>
</template>

<script>
import Agree from 'mand-mobile/lib/agree'

export default {
  components: {
    'md-agree': Agree,
  },
  data() {
    return {
      agreeConf: {
        checked: true,
        name: 'agree0',
        size: 'md',
        disabled: false,
        introduction: '选中状态',
      },
    }
  },
  methods: {
    onChange(name, checked) {
      // eslint-disable-next-line no-console
      console.log(`agree name = ${name} is ${checked ? 'checked' : 'unchecked'}`)
    },
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '选中状态',
  },
  'en-US': {
    title: 'Selected',
  },
  height: 120,
}
// #endregion ignore

</script>