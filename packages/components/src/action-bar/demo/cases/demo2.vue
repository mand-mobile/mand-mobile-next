<template>
  <div class="md-example-child md-example-child-action-bar md-example-child-1">
    <md-action-bar :actions="data"></md-action-bar>
  </div>
</template>

<script>
import ActionBar from 'mand-mobile/lib/action-bar'
import Toast from 'mand-mobile/lib/toast'

export default {
  name: 'action-bar-demo',
  /* DELETE */
  title: '按钮禁用',
  titleEnUS: 'Multiple buttons and disabled button',
  height: 150,
  /* DELETE */
  components: {
    'md-action-bar': ActionBar,
  },
  data() {
    return {
      data: [
        {
          text: '次要按钮',
          disabled: true,
        },
        {
          text: '主要按钮',
          disabled: true,
        },
      ],
    }
  },
  methods: {
    handleClick() {
      Toast.succeed('Click')
    },
  },
}

</script>
