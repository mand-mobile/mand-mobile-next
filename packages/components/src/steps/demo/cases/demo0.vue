<template>
  <div class="md-example-child md-example-child-steps md-example-child-steps-0">
    <md-steps :steps="steps"></md-steps>
  </div>
</template>

<script>
import Steps from 'mand-mobile/lib/steps'

export default {
  components: {
    'md-steps': Steps,
  },
  data() {
    return {
      steps: [
        {
          name: '登录/注册',
        },
        {
          name: '申请征信报告',
        },
        {
          name: '提取征信报告',
        },
      ],
    }
  },
}

</script>