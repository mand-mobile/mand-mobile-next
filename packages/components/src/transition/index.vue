<template>
  <!-- PLATFORM: globally registered primitive component-->
  <md-transition-primitive
    :show="show"
    :name="name"
    :styles="styles"
    @before-enter="$_onEventEmit('before-enter')"
    @enter="$_onEventEmit('enter')"
    @after-enter="$_onEventEmit('after-enter')"
    @before-leave="$_onEventEmit('before-leave')"
    @after="$_onEventEmit('leave')"
    @after-leave="$_onEventEmit('after-leave')"
  >
    <slot/>
  </md-transition-primitive>
</template>

<script>import Transition from '@mand-mobile/platform/lib/runtime/component/transition'
import '@mand-mobile/shared/lib/style/transition.styl'

import {camelize} from '@mand-mobile/shared/lib/util'

export default {
  name: 'md-transition',
  props: ['show', 'name', 'styles'],
  components: {
    'md-transition-primitive': Transition,
  },
  methods: {
    $_onEventEmit(event) {
      this.$emit(event)

      const eventAlias = camelize(event)
      if (eventAlias !== event) {
        this.$emit(eventAlias)
      }
    },
  },
}
</script>