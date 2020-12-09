<template>
  <div class="md-example-child md-example-child-captcha">
    <md-captcha
      :maxlength="4"
      :isView="true"
      brief="最新验证码依然有效，请勿重发"
    >验证码已发送至186****5407</md-captcha>
  </div>
</template>

<script>
import Captcha from 'mand-mobile/lib/captcha'

export default {
  components: {
    'md-captcha': Captcha,
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '内联',
  },
  'en-US': {
    title: 'Inline display',
  },
}
// #endregion ignore

</script>

<style scoped>
.md-number-keyboard {
  margin-top: 30px;
}
</style>
