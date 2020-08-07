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
  name: 'codebox-demo',
  /* DELETE */
  title: '系统键盘',
  titleEnUS: 'System keyboard',
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
