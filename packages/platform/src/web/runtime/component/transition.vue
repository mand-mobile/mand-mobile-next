<template functional>
  <transition v-bind="props" v-on="listeners">
    <div v-show="props.show">
      <slot></slot>  
    </div>
  </transition>
</template>

<script>
import '@mand-mobile/shared/lib/style/transition.styl'
export default {
  name: 'md-transition-primitive',
}
</script>
<style lang="stylus">
// @import '@mand-mobile/shared/lib/style/transition.styl'
</style>