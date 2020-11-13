<template>
  <div class="md-example-child md-example-child-codebox md-example-child-codebox-1">
    <md-codebox
      :mask="true"
      :maxlength="6"
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
    title: '掩码遮蔽',
  },
  'en-US': {
    title: 'Character mask',
  },
}
// #endregion ignore

</script>
