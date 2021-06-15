<script lang="ts">
export default {
  name: 'RadioDemo',
  title: '内联',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import MdRadio from 'mand-mobile/radio'
import MdField from 'mand-mobile/field'
import MdFieldItem from 'mand-mobile/field-item'

const checked = ref('0')
</script>

<template>
  <div
    class="
      md-example-child
      md-example-child-radio
      md-example-child-radio-0
    "
  >
    <md-field>
      <md-field-item title="婚姻状况" solid>
        <md-radio
          v-model="checked"
          name="0"
          label="已婚"
          inline
        />
        <md-radio
          v-model="checked"
          name="1"
          label="未婚"
          inline
        />
        <md-radio
          v-model="checked"
          name="2"
          label="保密"
          inline
        />
      </md-field-item>
    </md-field>
  </div>
</template>
