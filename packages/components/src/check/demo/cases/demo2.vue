<template>
  <div class="md-example-child md-example-child-check md-example-child-check-2">
    <md-field title="复选框">
    <md-check-box name="day" v-model="pay" label="日缴" disabled />
    <md-check-box name="month" v-model="pay" label="月付" />
    <md-check-box name="season" v-model="pay" label="季度费" />
    </md-field>
	</div>
</template>

<script>
import CheckBox from '../../box'
import Field from '../../../field'

export default {
  name: 'check-demo',
  /* DELETE */
  title: '复选框',
  titleEnUS: 'Check box',
  /* DELETE */
  components: {
    'md-check-box': CheckBox,
    'md-field': Field,
  },
  data() {
    return {
      pay: '',
    }
  },
}

</script>
