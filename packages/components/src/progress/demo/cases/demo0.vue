<template>
  <div class="md-example-child md-example-child-progress">
    <md-progress
      :size="100"
      :value="0.2"
      :width="5"
    >
      <span class="progress-value">20%</span>
    </md-progress>
    <md-progress
      :size="100"
      :value="0.5"
      :width="5"
    >
      <span class="progress-value">50%</span>
    </md-progress>
    <md-progress
      :size="100"
      :value="1"
      :width="5"
    >
      <span class="progress-value">100%</span>
    </md-progress>
  </div>
</template>

<script>
import Progress from '../../index'

export default {
  name: 'progress-demo',
  components: {
    'md-progress': Progress,
  },
}

</script>

<style>
.md-example-child-progress {
  display: flex;
  justify-content: center;
}
.md-progress {
  margin: 0 10px;
}

.progress-value {
  font-size: 24px;
  font-family: DINPro-Medium;
}
</style>
