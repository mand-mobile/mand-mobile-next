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
  name: 'codebox-demo',
  /* DELETE */
  title: '不限长度',
  titleEnUS: 'Unlimited length',
  /* DELETE */
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
