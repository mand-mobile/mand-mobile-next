<template>
  <div class="md-example-child md-example-child-steps md-example-child-steps-2">
    <md-steps
      :steps="steps"
      :current="2"
    >
      <template v-slot:icon>
        <span>99</span>
      </template>
    </md-steps>
 
  </div>
</template>

<script>
import Steps from '../../index'
import Icon from '../../../icon'

export default {
  name: 'steps-demo',
  /* DELETE */
  title: '自定义步骤图标',
  titleEnUS: 'Custom step icon',
  height: 150,
  /* DELETE */
  components: {
    'md-steps': Steps,
    'md-icon': Icon,
  },
  data() {
    return {
      steps: [
        {
          name: '登录',
        },
        {
          name: '开通',
        },
        {
          name: '验证',
        },
        {
          name: '成功',
        },
      ],
    }
  },
}

</script>
