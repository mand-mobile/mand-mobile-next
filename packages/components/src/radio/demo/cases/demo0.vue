<template>
  <div class="md-example-child md-example-child-radio md-example-child-radio-0">
    <md-radio name="0" v-model="checked" label="单选项1" />
    <md-radio name="1" v-model="checked" label="单选项2" />
  </div>
</template>

<script>
import Radio from 'mand-mobile/lib/radio'

export default {
  components: {
    'md-radio': Radio,
  },
  data() {
    return {
      checked: '0',
    }
  },
}

</script>
