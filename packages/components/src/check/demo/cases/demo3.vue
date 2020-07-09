<template>
  <div class="md-example-child md-example-child-check md-example-child-check-3">
     <md-field title="复选框组">
    <md-check-group v-model="insurants">
      <md-check-box name="self" disabled>自己</md-check-box>
      <md-check-box name="couple">配偶</md-check-box>
      <md-check-box name="parent">父母</md-check-box>
      <md-check-box name="child">子女</md-check-box>
    </md-check-group>
     </md-field>
	</div>
</template>

<script>
import CheckBox from '../../box'
import CheckGroup from '../../group'
import Field from '../../../field'

export default {
  name: 'check-demo',
  /* DELETE */
  title: '复选框组',
  titleEnUS: 'Check box group',
  /* DELETE */
  components: {
    'md-check-box': CheckBox,
    'md-check-group': CheckGroup,
    'md-field': Field,
  },
  data() {
    return {
      insurants: ['self'],
    }
  }
}

</script>
