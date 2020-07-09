<template>
  <div class="md-example-child md-example-child-codebox md-example-child-codebox-0">
    <md-codebox
      v-model="code"
      :maxlength="4"
      autofocus
    />
  </div>
</template>

<script>
import Codebox from '../../index'

export default {
  name: 'codebox-demo',
  components: {
    'md-codebox': Codebox,
  },
  data() {
    return {
      code: '',
    }
  },
}

</script>
