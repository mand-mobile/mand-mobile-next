<template>
  <div
    class="
      md-example-child
      md-example-child-icon
      md-example-child-icon-1
    "
  >
    <div class="md-example-item-s">
      <md-icon
        name="spinner"
        size="lg"
        style="filter: invert(1)"
      ></md-icon>
      <p>spinner</p>
    </div>
    <div class="md-example-item-s">
      <md-icon name="success-color" size="lg" svg></md-icon>
      <p>success-color</p>
    </div>
    <div class="md-example-item-s">
      <md-icon name="warn-color" size="lg" svg></md-icon>
      <p>warn-color</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Icon } from 'mand-mobile-next/icon'

export default {
  name: 'IconDemo',
  /* DELETE */
  title: 'svg图标',
  titleEnUS: 'Svg Icon',
  align: 'center',
  background: '#fff',
  /* DELETE */
  components: {
    [Icon.name]: Icon,
  },
}
</script>
