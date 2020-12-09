<template>
  <div class="md-example-child md-example-child-codebox md-example-child-codebox-2">
    <md-codebox
      :maxlength="-1"
      v-model="code"
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
    title: '不限长度',
  },
  'en-US': {
    title: 'Unlimited length',
  },
}
// #endregion ignore

</script>
