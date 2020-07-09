<template>
  <div class="md-example-child md-example-child-check md-example-child-check-1">
    <md-field title="复选项组">
    <md-check-group v-model="favorites">
      <md-check name="watermelon" label="西瓜" />
      <md-check name="apple" label="苹果" />
      <md-check name="banana" label="香蕉" />
      <md-check name="orange" label="橙子" />
      <md-check name="tomato" label="西红柿" disabled />
    </md-check-group>
    </md-field>
	</div>
</template>

<script>
import Check from '../../index'
import CheckGroup from '../../group'
import Field from '../../../field'

export default {
  name: 'check-demo',
  /* DELETE */
  title: '复选项组',
  titleEnUS: 'Check options group',
  /* DELETE */
  components: {
    'md-check': Check,
    'md-check-group': CheckGroup,
    'md-field': Field,
  },
  data() {
    return {
      favorites: ['apple'],
    }
  },
}

</script>
