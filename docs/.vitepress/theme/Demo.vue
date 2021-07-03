<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup(props, { slots }) {
    const defaultSlots = slots.default?.() || []
    // console.log(defaultSlots)
  },
})
</script>

<template>
  <div class="demo-wrapper m-auto">
    <slot></slot>
  </div>
</template>

<style lang="stylus">
.demo-wrapper {
  max-width: calc(750px * 2 + 10px);
  zoom: .5;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.demo-wrapper > div {
  flex: 0 0 750px;
}

@media (max-width: 640px) {
  .demo-wrapper {
    max-width: 100%;
  }

  .demo-wrapper > div {
    flex: 0 0 100%;
  }
}

.demo-wrapper
  .md-button
    margin-bottom 12px
    &.inline, &.link
      margin-right 12px
</style>
