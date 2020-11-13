<template>
  <div class="md-example-child md-example-child-radio md-example-child-radio-3">
    <md-radio-group v-model="favorites">
      <md-radio name="watermelon" label="西瓜"/>
      <md-radio name="apple" label="苹果" />
      <md-radio name="banana" label="香蕉" />
      <md-radio name="orange" label="橙子" />
      <md-radio name="tomato" label="西红柿" disabled />
    </md-radio-group>
  </div>
</template>

<script>
import Radio from 'mand-mobile/lib/radio'
import RadioGroup from 'mand-mobile/lib/radio/group'

export default {
  components: {
    'md-radio': Radio,
    'md-radio-group': RadioGroup,
  },
  data() {
    return {
      favorites: 'apple',
    }
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '单选项组',
  },
  'en-US': {
    title: 'Radio group',
  },
}
// #endregion ignore

</script>
