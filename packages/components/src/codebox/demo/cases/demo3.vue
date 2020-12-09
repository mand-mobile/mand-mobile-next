<template>
  <div class="md-example-child md-example-child-codebox md-example-child-codebox-3">
    <md-codebox
      :maxlength="-1"
      v-model="code"
      :system="true"
    />
  </div>
</template>

<script>
import Codebox from 'mand-mobile/lib/codebox'

export default {
  components: {
    'md-codebox': Codebox,
  },
  data() {
    return {
      code: '',
    }
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '系统键盘',
  },
  'en-US': {
    title: 'System keyboard',
  },
}
// #endregion ignore

</script>
